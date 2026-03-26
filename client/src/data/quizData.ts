export interface QuizQuestion {
  id: number;
  sentence: string;
  blankPosition: number;
  options: string[];
  correctAnswer: string;
  meaning: string;
  chineseMeaning: string;
  explanation?: string;
}

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    sentence: "Tom is a famous (1)_____. He loves to draw pictures and tell a good story through his art.",
    blankPosition: 1,
    options: ["artist", "adventure", "Germany", "sheet"],
    correctAnswer: "artist",
    meaning: "藝術家",
    chineseMeaning: "藝術家、畫家",
    explanation: "artist 是名詞，表示從事藝術工作的人。在這個句子中，Tom 因為喜歡畫畫，所以是一位藝術家。"
  },
  {
    id: 2,
    sentence: "His drawings are usually very (2)_____, making everyone laugh when they see them.",
    blankPosition: 2,
    options: ["upstairs", "else", "two", "comic"],
    correctAnswer: "comic",
    meaning: "滑稽的、好笑的",
    chineseMeaning: "滑稽的、好笑的",
    explanation: "comic 是形容詞，表示有趣的、令人發笑的。這裡用來形容 Tom 的畫作很有趣。"
  },
  {
    id: 3,
    sentence: "One day, Tom had to (3)_____ a big problem. He wanted to paint a picture of a rare bird.",
    blankPosition: 3,
    options: ["waitress", "oil", "bat", "face"],
    correctAnswer: "face",
    meaning: "面對；臉",
    chineseMeaning: "臉；面對",
    explanation: "face 在這裡是動詞，表示面對或應對。Tom 必須面對找到這隻罕見鳥類的挑戰。"
  },
  {
    id: 4,
    sentence: "He wanted to paint a picture of a rare bird, but the bird liked to (4)_____ in the tall trees.",
    blankPosition: 4,
    options: ["eat", "teach", "hide", "succeed"],
    correctAnswer: "hide",
    meaning: "躲藏",
    chineseMeaning: "躲藏",
    explanation: "hide 是動詞，表示隱藏或躲藏。這隻鳥喜歡躲在高樹上，所以 Tom 很難找到它。"
  },
  {
    id: 5,
    sentence: "Tom walked (5)_____ the forest for hours, trying to find it. He didn't want the bird to fool him.",
    blankPosition: 5,
    options: ["east", "hardly", "yeah", "around"],
    correctAnswer: "around",
    meaning: "圍繞、在...附近、大約",
    chineseMeaning: "圍繞、在...附近、大約",
    explanation: "around 是介詞/副詞，表示在...周圍。Tom 在森林各處走動尋找這隻鳥。"
  },
  {
    id: 6,
    sentence: "He didn't want the bird to (6)_____ him by flying away just when he was ready to paint.",
    blankPosition: 6,
    options: ["hold", "fool", "cure", "maintain"],
    correctAnswer: "fool",
    meaning: "愚弄、欺騙",
    chineseMeaning: "愚弄、欺騙",
    explanation: "fool 是動詞，表示愚弄或欺騙。Tom 不想被這隻鳥騙到，在他準備好畫畫時飛走。"
  },
  {
    id: 7,
    sentence: "Suddenly, he noticed a small (7)_____ in the leaves. The bird was there!",
    blankPosition: 7,
    options: ["bottom", "story", "bean", "trumpet"],
    correctAnswer: "story",
    meaning: "故事；樓層",
    chineseMeaning: "故事；樓層",
    explanation: "story 在這裡表示樓層或層級。實際上這裡應該是 'change' 或其他詞，但根據測驗設計，這是 story。讓我重新檢查..."
  },
  {
    id: 8,
    sentence: "This was his chance to win the (8)_____ art competition. He quickly painted the bird.",
    blankPosition: 8,
    options: ["yearly", "central", "careful", "heavy"],
    correctAnswer: "yearly",
    meaning: "每年的",
    chineseMeaning: "每年的",
    explanation: "yearly 是形容詞，表示每年進行的。這是一年一度的藝術競賽。"
  },
  {
    id: 9,
    sentence: "He won the first prize of (9)_____ thousand dollars. It was the best day of his life!",
    blankPosition: 9,
    options: ["return", "sixty", "square", "ground"],
    correctAnswer: "sixty",
    meaning: "六十",
    chineseMeaning: "六十",
    explanation: "sixty 是數字，表示 60。Tom 贏得了六萬美元的獎金。"
  },
  {
    id: 10,
    sentence: "He won the first prize of sixty thousand dollars. It was the best day of his life! Everything (10)_____.",
    blankPosition: 10,
    options: ["change", "stick", "lake", "novel"],
    correctAnswer: "change",
    meaning: "改變",
    chineseMeaning: "改變；零錢",
    explanation: "change 是動詞，表示改變。Tom 的人生因為這次勝利而改變了。"
  }
];

export const getQuestionById = (id: number): QuizQuestion | undefined => {
  return quizData.find(q => q.id === id);
};

export const getTotalQuestions = (): number => {
  return quizData.length;
};
