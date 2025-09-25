"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
// import type { StaticImageData } from "next/image";
import Image from "next/image";
import QuizProgress from "./QuizProgress";
import styles from "./quiz.module.scss";
import type { Answer, QuizProps, QuizState, RecommendedProduct } from "./types";
import { fetchProducts } from "@/services/products";
import Button from "@/components/Button/Button";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";
import type { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import SuccessBlock from "./SuccessBlock";
// import PhoneConsultationForm from "./PhoneConsultationForm";



const Quiz: React.FC<QuizProps> = ({ data, onComplete }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string | number, boolean>>({});
  const router = useRouter();
  const { isMobile, isTablet } = useDeviceDetection();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string | number, string>>({});
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const [addedImpact, setAddedImpact] = useState<Record<string | number, boolean>>({});

  const toggleCardFlip = (productId: string | number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    showResults: false,
    recommendedProducts: []
  });

  const { questions } = data;
  const { currentQuestionIndex, answers, showResults, recommendedProducts } =
    state;

    useEffect(() => {
      if (showResults && recommendedProducts.length > 0) {
        setSelectedSizes((prev) => {
          const updated = { ...prev };
          recommendedProducts.forEach((product) => {
            const key = String(product.id);
            if (!updated[key] && product.selectedOptions?.length) {
              updated[key] = product.selectedOptions[0];
            }
          });
          return updated;
        });
      }
    }, [showResults, recommendedProducts]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "l";
    return "l";
  };

  const handleSizeChange = useCallback((productId: string | number, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [String(productId)]: size
    }));
  }, []);

  const renderSizes = useCallback(
    (product: Product) => (
      <>
        {product.selectedOptions?.length ? (
          <select
            className={styles.sizeSelect}
            value={selectedSizes[String(product.id)] || ""}
            onChange={(e) => handleSizeChange(product.id, e.target.value)}
          >
            <option value="">Оберіть розмір</option>
            {product.selectedOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div className={styles.noSizes}>Розміри не доступні</div>
        )}
      </>
    ),
    [selectedSizes, handleSizeChange]
  );

  const { currentQuestion, totalQuestions, isLastQuestion, isFirstQuestion } =
    useMemo(
      () => ({
        currentQuestion: questions[currentQuestionIndex],
        totalQuestions: questions.length,
        isLastQuestion: currentQuestionIndex === questions.length - 1,
        isFirstQuestion: currentQuestionIndex === 0
      }),
      [currentQuestionIndex, questions]
    );

  const hasAnsweredCurrent = useMemo(
    () => answers.some((a) => a.questionId === currentQuestion.id),
    [answers, currentQuestion.id]
  );

  const currentAnswer = useMemo(
    () => answers.find((a) => a.questionId === currentQuestion.id),
    [answers, currentQuestion.id]
  );

  const handleOptionSelect = (optionId: number) => {
    if (currentAnswer?.optionId === optionId) {
      setState((prev) => ({
        ...prev,
        answers: prev.answers.filter((a) => a.questionId !== currentQuestion.id)
      }));
      return;
    }

    const newAnswer = {
      questionId: currentQuestion.id,
      optionId
    };

    setState((prev) => ({
      ...prev,
      answers: prev.answers.some((a) => a.questionId === currentQuestion.id)
        ? prev.answers.map((a) =>
            a.questionId === currentQuestion.id ? newAnswer : a
          )
        : [...prev.answers, newAnswer]
    }));
  };

  const calculateResults = (
    userAnswers: Answer[]
  ): { name: string; score: number }[] => {
    const productScores: Record<string, number> = {};

    products.forEach((product) => {
      productScores[product.name] = 0;
    });

    userAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      const option = question?.options.find((o) => o.id === answer.optionId);

      option?.recommendedProducts?.forEach((productName) => {
        if (productName in productScores) {
          productScores[productName] += 1;
        }
      });
    });

    return Object.entries(productScores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const enrichResultsWithProductData = (
    results: { name: string; score: number }[]
  ): RecommendedProduct[] => {
    return results
      .map((result) => {
        const product = products.find((p) => p.name === result.name);
        return product
          ? {
              ...product,
              score: result.score,
              photoProduct: product.mainImage,
              price: product.price,
              isNew: false,
              volume: product.selectedOptions?.[0] || ""
            }
          : null;
      })
      .filter((product): product is RecommendedProduct => product !== null);
  };

  const handleNext = () => {
    if (!hasAnsweredCurrent) {
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }

    if (isLastQuestion) {
      if (products.length === 0) {
        alert("Продукти ще не завантажені. Спробуйте ще раз.");
        return;
      }

      const results = calculateResults(answers);
      const enrichedResults = enrichResultsWithProductData(results);

      setState((prev) => ({
        ...prev,
        showResults: true,
        recommendedProducts: enrichedResults
      }));

      onComplete({ recommendedProducts: results });
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  const restartQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      answers: [],
      showResults: false,
      recommendedProducts: []
    });
    setSelectedSizes({});
  };

  const handleAddToCart = (product: RecommendedProduct) => {
    const selectedSize = selectedSizes[String(product.id)];

    if (!selectedSize && product.selectedOptions?.length) {
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }

    // Используем правильный размер для добавления в корзину
    const sizeToAdd = selectedSize || product.selectedOptions?.[0] || "";
    
    addToCart(product, sizeToAdd);
    setAddedProductName(product.name);
    setShowAddToCartSuccess(true);
    setAddedImpact((prev) => ({ ...prev, [String(product.id)]: true }));
    setTimeout(() => {
      setShowAddToCartSuccess(false);
      setAddedImpact((prev) => ({ ...prev, [String(product.id)]: false }));
    }, 1200);
  };

  if (isLoading) {
    return <div className={styles.loading}>Завантаження продуктів...</div>;
  }

  if (showResults) {
    return (
      <div className={styles.resultsContainer}>
        <h2 className={styles.resultsTitle}>Рекомендації</h2>

        {showSizeWarning && (
          <div className={styles.sizeWarning}>
            Будь ласка, оберіть розмір перед покупкою.
          </div>
        )}

        {showAddToCartSuccess && (
          <div className={`${styles.sizeWarning} ${styles.success}`}>
            {addedProductName} додано до кошика
          </div>
        )}

        <div className={styles.productsFlex}>
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className={`${styles.productCard} ${flippedCards[String(product.id)] ? styles.flipped : ""}`}
            >
              <div className={styles.cardInner}>
                {/* Передня частина картки */}
                <div className={styles.cardFront}>
                  <div className={styles.productImageContainer}>
                    <Link legacyBehavior passHref href={`/${product._id}`}>
                      <a
                        className={styles.badgeInfo}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          alt={product.name}
                          className={styles.productImage}
                          height={200}
                          priority={true}
                          src={product.mainImage}
                          width={300}
                        />
                      </a>
                    </Link>
                    <button
                      className={styles.infoButton}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCardFlip(String(product.id));
                      }}
                    >
                      <Icon
                        fill="none"
                        name="icon-info"
                        size={isMobile ? 24 : 28}
                        stroke={styles.yellowColor}
                      />
                    </button>
                    {product.comparePrice && product.comparePrice > product.price && (
                      <span className={styles.productBadge}>
                        SALE
                      </span>
                    )}
                  </div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productPrice}>Від {product.price} грн</div>
                  <form className={styles.productSizeForm}>
                    {renderSizes(product)}
                  </form>
                  <div className={styles.buttonContainer}>
                    <Button
                      className={`${styles.buyButton} ${addedImpact[String(product.id)] ? styles.added : ''}`}
                      size={isMobile ? "l" : isTablet ? "l" : "xl"}
                      variant="primary"
                      onClick={() => handleAddToCart(product)}
                      disabled={addedImpact[String(product.id)]}
                    >
                      <span className={styles.textButton}>
                        {addedImpact[String(product.id)] ? "Додано!" : "ДОДАТИ ДО КОШИКА"}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Задня частина картки */}
                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    {product.description && (
                      <div className={styles.description}>
                        <h4>Опис</h4>
                        <p>{product.description}</p>
                      </div>
                    )}
                    {product.additionalInfo && (
                      <div className={styles.additionalInfo}>
                        <h4>Додаткова інформація</h4>
                        <p>{product.additionalInfo}</p>
                      </div>
                    )}
                  </div>
                  <button
                    className={styles.flipBackButton}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleCardFlip(String(product.id));
                    }}
                  >
                    <Icon
                      fill="none"
                      name="icon-info"
                      size={isMobile ? 24 : 28}
                      stroke={styles.yellowColor}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.resultsButtons}>
          <Button
            className={styles.restartButton}
            size={isMobile ? "m" : "l"}
            variant="secondary"
            onClick={restartQuiz}
          >
            <span className={styles.textButton}>Пройти тест знову</span>
          </Button>
        </div>
        <SuccessBlock />
        {/* <PhoneConsultationForm /> */}
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <QuizProgress current={currentQuestionIndex + 1} total={totalQuestions} />

      <h2 className={styles.questionText}>
        {currentQuestion.text.charAt(0).toUpperCase() +
          currentQuestion.text.slice(1).toLowerCase()}
      </h2>

      <div className={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            className={`${styles.optionItem} ${
              currentAnswer?.optionId === option.id ? styles.selected : ""
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>

      <div className={styles.navigationButtons}>
        {isFirstQuestion && answers.length === 0 ? (
          <Button
            className={styles.homeButton}
            size={getButtonSize()}
            variant="secondary"
            onClick={goToHome}
          >
            <div className={styles.iconContainer}>
              <Icon
                className={styles.feedbackButtonIcon}
                fill="black"
                name="icon-left-icon"
                size={isMobile ? 20 : 30}
                stroke="white"
              />
            </div>
            <span className={styles.buttonHome}>
              {isMobile ? "ГОЛОВНА" : "НА ГОЛОВНУ"}
            </span>
          </Button>
        ) : (
          <Button
            className={styles.backButton}
            disabled={isFirstQuestion}
            size={getButtonSize()}
            variant="secondary"
            onClick={handleBack}
          >
            <div className={styles.iconContainer}>
              <Icon
                className={styles.feedbackButtonIcon}
                fill="black"
                name="icon-left-icon"
                size={isMobile ? 20 : 30}
                stroke="white"
              />
            </div>
            <span className={styles.backText}>НАЗАД</span>
          </Button>
        )}

        <Button
          className={styles.nextButton}
          disabled={!hasAnsweredCurrent}
          size={getButtonSize()}
          variant="primary"
          onClick={handleNext}
        >
          {isLastQuestion ? "РЕЗУЛЬТАТ" : "ДАЛІ"}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
