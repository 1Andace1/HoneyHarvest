interface LevelInfo {
    minSpent: number;
    reward: string;
  }

  interface Achievement {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    icon: string;
  }
  
  export default class LoyaltyProgram {
    private levels: Record<string, LevelInfo> = {
      standard: { minSpent: 0, reward: 'Нет' },
      silver: { minSpent: 500, reward: 'Скидка 5%' },
      gold: { minSpent: 1000, reward: 'Скидка 10%' },
        // ? подумать мне еще какие  уврони еще может сделать
    };

    private achievements: Achievement[] = [
      { id: '1', name: 'Медовый гурман', description: 'Совершение 10 заказов с медом разных сортов', isCompleted: false, icon: 'gourmet_icon.png' },
      { id: '2', name: 'Медовый критик', description: 'Написание 5 отзывов о продуктах', isCompleted: false, icon: 'critic_icon.png' },
      { id: '3', name: 'Медовый эксперт', description: 'Покупка продукции от всех местных пчеловодов', isCompleted: false, icon: 'expert_icon.png' },
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
            achievement.isCompleted = userActions.ordersCount >= 10;
            break;
          case '2':
            achievement.isCompleted = userActions.reviewsCount >= 5;
            break;
          case '3':
            achievement.isCompleted = userActions.localProductsPurchased;
            break;
        
          default:
            break;
        }
      });
    }
  }