import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, Star, Target, Award, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;
  totalQuizzes: number;
  badges: string[];
  missions: { id: string; title: string; progress: number; target: number; completed: boolean }[];
}

const AVAILABLE_BADGES = [
  { id: 'first_quiz', name: 'First Steps', icon: Star, requirement: 'Complete your first quiz' },
  { id: 'week_streak', name: '7-Day Warrior', icon: Flame, requirement: '7-day streak' },
  { id: 'perfect_score', name: 'Perfectionist', icon: Trophy, requirement: 'Score 100% on any quiz' },
  { id: 'quiz_master', name: 'Quiz Master', icon: Award, requirement: 'Complete 10 quizzes' },
  { id: 'speed_demon', name: 'Speed Demon', icon: Zap, requirement: 'Complete quiz in under 5 minutes' },
  { id: 'scholar', name: 'Scholar', icon: Target, requirement: 'Complete all quiz categories' },
];

const StreakTracker = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '',
    totalQuizzes: 0,
    badges: [],
    missions: []
  });

  useEffect(() => {
    const data = localStorage.getItem('quiz_streak_data');
    if (data) {
      setStreakData(JSON.parse(data));
    } else {
      // Initialize with default missions
      const defaultMissions = [
        { id: 'ancient_texts', title: 'Complete 3 Ancient Texts quizzes', progress: 0, target: 3, completed: false },
        { id: 'perfect_streak', title: 'Get 3 perfect scores', progress: 0, target: 3, completed: false },
        { id: 'category_master', title: 'Try all quiz categories', progress: 0, target: 6, completed: false }
      ];
      setStreakData(prev => ({ ...prev, missions: defaultMissions }));
    }
  }, []);

  const earnedBadges = AVAILABLE_BADGES.filter(badge => streakData.badges.includes(badge.id));
  const lockedBadges = AVAILABLE_BADGES.filter(badge => !streakData.badges.includes(badge.id));

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold gradient-text">{streakData.currentStreak} days</div>
              <p className="text-sm text-muted-foreground mt-1">
                Longest: {streakData.longestStreak} days
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">{streakData.totalQuizzes}</div>
              <p className="text-sm text-muted-foreground">Total Quizzes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Badges & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3">Earned Badges ({earnedBadges.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {earnedBadges.map(badge => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className="flex flex-col items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <span className="text-xs font-medium text-center">{badge.name}</span>
                      <span className="text-xs text-muted-foreground text-center mt-1">{badge.requirement}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Locked Badges ({lockedBadges.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lockedBadges.map(badge => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.id} className="flex flex-col items-center p-3 rounded-lg bg-muted/30 border border-border opacity-50">
                      <Icon className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-xs font-medium text-center">{badge.name}</span>
                      <span className="text-xs text-muted-foreground text-center mt-1">{badge.requirement}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {streakData.missions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Active Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {streakData.missions.map(mission => (
                <div key={mission.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{mission.title}</span>
                    <Badge variant={mission.completed ? "default" : "outline"}>
                      {mission.progress}/{mission.target}
                    </Badge>
                  </div>
                  <Progress value={(mission.progress / mission.target) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StreakTracker;
