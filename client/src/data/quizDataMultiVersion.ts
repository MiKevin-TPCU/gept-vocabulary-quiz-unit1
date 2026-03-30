export interface QuizQuestion {
  id: number;
  sentence: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizVersion {
  name: string;
  label: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizVersions: Record<string, QuizVersion> = {
  pretest: {
    name: 'pretest',
    label: '前測 (Pretest)',
    description: '第一週課程開始前 - 10 分鐘內完成',
    questions: [
      {
        id: 1,
        sentence: "Tom is a famous (1)_____. He loves to draw pictures and tell a good story through his art.",
        options: ["artist", "adventure", "Germany", "sheet"],
        correctAnswer: "artist"
      },
      {
        id: 2,
        sentence: "His drawings are usually very (2)_____, making everyone laugh when they see them.",
        options: ["upstairs", "else", "two", "comic"],
        correctAnswer: "comic"
      },
      {
        id: 3,
        sentence: "One day, Tom had to (3)_____ a big problem. He wanted to paint a picture of a rare bird.",
        options: ["waitress", "oil", "bat", "face"],
        correctAnswer: "face"
      },
      {
        id: 4,
        sentence: "He wanted to paint a picture of a rare bird, but the bird liked to (4)_____ in the tall trees.",
        options: ["eat", "teach", "hide", "succeed"],
        correctAnswer: "hide"
      },
      {
        id: 5,
        sentence: "Tom walked (5)_____ the forest for hours, trying to find it. He didn't want the bird to fool him.",
        options: ["east", "hardly", "yeah", "around"],
        correctAnswer: "around"
      },
      {
        id: 6,
        sentence: "He didn't want the bird to (6)_____ him by flying away just when he was ready to paint.",
        options: ["hold", "fool", "cure", "maintain"],
        correctAnswer: "fool"
      },
      {
        id: 7,
        sentence: "Suddenly, he noticed a small (7)_____ in the leaves. The bird was there!",
        options: ["bottom", "change", "bean", "trumpet"],
        correctAnswer: "change"
      },
      {
        id: 8,
        sentence: "This was his chance to win the (8)_____ art competition. He quickly painted the bird.",
        options: ["yearly", "central", "careful", "heavy"],
        correctAnswer: "yearly"
      },
      {
        id: 9,
        sentence: "He won the first prize of (9)_____ thousand dollars. It was the best day of his life!",
        options: ["return", "sixty", "square", "ground"],
        correctAnswer: "sixty"
      },
      {
        id: 10,
        sentence: "Everything (10)_____ for Tom after he won the art competition and became famous.",
        options: ["change", "stick", "lake", "novel"],
        correctAnswer: "change"
      }
    ]
  },

  immediate_posttest: {
    name: 'immediate_posttest',
    label: '立即後測 (Immediate Posttest)',
    description: '第一週課程最後 - 10 分鐘內完成',
    questions: [
      {
        id: 1,
        sentence: "The talented (1)_____ displayed his latest collection of paintings at the gallery opening.",
        options: ["artist", "adventure", "Germany", "sheet"],
        correctAnswer: "artist"
      },
      {
        id: 2,
        sentence: "The audience found the performance (2)_____ and entertaining, laughing throughout the show.",
        options: ["upstairs", "else", "two", "comic"],
        correctAnswer: "comic"
      },
      {
        id: 3,
        sentence: "Students must (3)_____ the challenges of learning new artistic techniques with patience.",
        options: ["waitress", "oil", "bat", "face"],
        correctAnswer: "face"
      },
      {
        id: 4,
        sentence: "Many birds (4)_____ among the dense vegetation to protect themselves from predators.",
        options: ["eat", "teach", "hide", "succeed"],
        correctAnswer: "hide"
      },
      {
        id: 5,
        sentence: "The artist walked (5)_____ the studio, observing different artworks and seeking inspiration.",
        options: ["east", "hardly", "yeah", "around"],
        correctAnswer: "around"
      },
      {
        id: 6,
        sentence: "The magician tried to (6)_____ the audience with his clever illusions and tricks.",
        options: ["hold", "fool", "cure", "maintain"],
        correctAnswer: "fool"
      },
      {
        id: 7,
        sentence: "The weather will (7)_____ from sunny to rainy throughout the week.",
        options: ["bottom", "change", "bean", "trumpet"],
        correctAnswer: "change"
      },
      {
        id: 8,
        sentence: "The museum hosts a (8)_____ art exhibition that attracts visitors from around the world.",
        options: ["yearly", "central", "careful", "heavy"],
        correctAnswer: "yearly"
      },
      {
        id: 9,
        sentence: "The lottery winner received (9)_____ thousand dollars as the grand prize.",
        options: ["return", "sixty", "square", "ground"],
        correctAnswer: "sixty"
      },
      {
        id: 10,
        sentence: "His life will (10)_____ dramatically once he receives his degree and starts his career.",
        options: ["change", "stick", "lake", "novel"],
        correctAnswer: "change"
      }
    ]
  }
};

export function getQuizVersion(testType: string): QuizVersion | undefined {
  return quizVersions[testType];
}
