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
        options: ["bottom", "story", "bean", "trumpet"],
        correctAnswer: "story"
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
        sentence: "He won the first prize of sixty thousand dollars. It was the best day of his life! Everything (10)_____.",
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
        sentence: "Sarah is a talented (1)_____ who creates beautiful sculptures.",
        options: ["artist", "adventure", "Germany", "sheet"],
        correctAnswer: "artist"
      },
      {
        id: 2,
        sentence: "Every (2)_____, the museum holds a special exhibition to showcase new artworks.",
        options: ["yearly", "central", "careful", "heavy"],
        correctAnswer: "yearly"
      },
      {
        id: 3,
        sentence: "The children laughed at the (3)_____ performance by the clown.",
        options: ["upstairs", "else", "two", "comic"],
        correctAnswer: "comic"
      },
      {
        id: 4,
        sentence: "She had to (4)_____ many challenges to become a successful artist.",
        options: ["waitress", "oil", "bat", "face"],
        correctAnswer: "face"
      },
      {
        id: 5,
        sentence: "The shy student would (5)_____ in the corner during group discussions.",
        options: ["eat", "teach", "hide", "succeed"],
        correctAnswer: "hide"
      },
      {
        id: 6,
        sentence: "The teacher walked (6)_____ the classroom, checking each student's work.",
        options: ["east", "hardly", "yeah", "around"],
        correctAnswer: "around"
      },
      {
        id: 7,
        sentence: "Don't let anyone (7)_____ you into making a decision you'll regret.",
        options: ["hold", "fool", "cure", "maintain"],
        correctAnswer: "fool"
      },
      {
        id: 8,
        sentence: "The old book told an interesting (8)_____ about ancient civilizations.",
        options: ["bottom", "story", "bean", "trumpet"],
        correctAnswer: "story"
      },
      {
        id: 9,
        sentence: "The company decided to (9)_____ its business strategy to stay competitive.",
        options: ["change", "stick", "lake", "novel"],
        correctAnswer: "change"
      },
      {
        id: 10,
        sentence: "The lottery winner received (10)_____ thousand dollars as the grand prize.",
        options: ["return", "sixty", "square", "ground"],
        correctAnswer: "sixty"
      }
    ]
  },

  delayed_posttest: {
    name: 'delayed_posttest',
    label: '延遲後測 (Delayed Posttest)',
    description: '第三週課程 - 10 分鐘內完成',
    questions: [
      {
        id: 1,
        sentence: "The museum invited a famous (1)_____ to display her latest collection.",
        options: ["artist", "adventure", "Germany", "sheet"],
        correctAnswer: "artist"
      },
      {
        id: 2,
        sentence: "The company holds a (2)_____ meeting to review its annual performance.",
        options: ["yearly", "central", "careful", "heavy"],
        correctAnswer: "yearly"
      },
      {
        id: 3,
        sentence: "The (3)_____ movie made the audience laugh throughout the entire screening.",
        options: ["upstairs", "else", "two", "comic"],
        correctAnswer: "comic"
      },
      {
        id: 4,
        sentence: "Athletes must (4)_____ pressure during important competitions.",
        options: ["waitress", "oil", "bat", "face"],
        correctAnswer: "face"
      },
      {
        id: 5,
        sentence: "The treasure was (5)_____ deep in the cave, waiting to be discovered.",
        options: ["eat", "teach", "hide", "succeed"],
        correctAnswer: "hide"
      },
      {
        id: 6,
        sentence: "The tourists traveled (6)_____ the world, visiting many different countries.",
        options: ["east", "hardly", "yeah", "around"],
        correctAnswer: "around"
      },
      {
        id: 7,
        sentence: "Be careful not to (7)_____ yourself into believing false information.",
        options: ["hold", "fool", "cure", "maintain"],
        correctAnswer: "fool"
      },
      {
        id: 8,
        sentence: "The author wrote an exciting (8)_____ about a mysterious adventure.",
        options: ["bottom", "story", "bean", "trumpet"],
        correctAnswer: "story"
      },
      {
        id: 9,
        sentence: "The weather will (9)_____ from sunny to rainy over the next few days.",
        options: ["change", "stick", "lake", "novel"],
        correctAnswer: "change"
      },
      {
        id: 10,
        sentence: "The project required approximately (10)_____ volunteers to complete successfully.",
        options: ["return", "sixty", "square", "ground"],
        correctAnswer: "sixty"
      }
    ]
  }
};

export const getQuizVersion = (versionName: string): QuizVersion | undefined => {
  return quizVersions[versionName];
};

export const getAllVersions = (): QuizVersion[] => {
  return Object.values(quizVersions);
};

export const getVersionNames = (): string[] => {
  return Object.keys(quizVersions);
};
