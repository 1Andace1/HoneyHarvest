interface LevelInfo {
    minSpent: number;
    reward: string;
  }

  interface Achievement {
    id: string;
    name: string;
    description: string;
    descriptionDone: string;
    isCompleted: boolean;
    icon: string;
  }
  
  export default class LoyaltyProgram {
    private levels: Record<string, LevelInfo> = {
      standard: { minSpent: 0, reward: 'Скидка 3%' },
      silver: { minSpent: 500, reward: 'Скидка 5%' },
      gold: { minSpent: 1000, reward: 'Скидка 10%' },
        // ? подумать мне еще какие  уврони еще может сделать
    };

    private achievements: Achievement[] = [
      { id: '1', name: 'Медовый гурман', description: 'Совершить 2 заказа с медом разных сортов', descriptionDone: 'Ура, поздравляем! Вы купили уже 2 меда разных сортов', isCompleted: false, icon: `http://localhost:3000/icons/honey_1.png` },
      { id: '2', name: 'Медовый критик', description: 'Написать 5 отзывов о товарах', descriptionDone: 'Ура, поздравляем! Вы написали 5 отзывов о товарах', isCompleted: false, icon: 'http://localhost:3000/icons/honey_2.png' },
      { id: '3', name: 'Медовый эксперт', description: 'Купить товар из каждой категории более 1 раза', descriptionDone: 'Ура, поздравляем! Вы попробовали абсолютно все и теперь Гуру всех категорий!', isCompleted: false, icon: 'http://localhost:3000/icons/honey_3.png' },
      // ? подумать мне еще какие достижения внести
    ];
  
    getUserLevel(totalSpent: number): string {
      let userLevel = 'standard';
      for (const [level, info] of Object.entries(this.levels)) {
        if (totalSpent >= info.minSpent) {
          return level;
        }
      }
      return userLevel;
    }
  
    getReward(totalSpent: number): string {
      const userLevel = this.getUserLevel(totalSpent);
      return this.levels[userLevel].reward;
    }

    getAchievements(): Achievement[] {
      return this.achievements;
    }

    updateAchievementStatus(userActions: any): void {
      this.achievements.forEach(achievement => {
        switch (achievement.id) {
          case '1':
            achievement.isCompleted = userActions.ordersCount >= 2;
            break;
          case '2':
            achievement.isCompleted = userActions.reviewsCount >= 5;
            break;
          case '3':
            achievement.isCompleted = userActions.localProductsPurchased >= 10;
            break;
        
          default:
            break;
        }
      });
    }
  }