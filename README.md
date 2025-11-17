### ソロプロ
- ダイエット競争アプリ(FitRanker)
  - 毎回の筋トレ / 有酸素を記録すると「ポイント」が貯まる
  - それぞれ種目とレップ数ごとに数字を獲得できてそれを複数のユーザーできそう
    - 日数の継続ボーナスのようなものをつける
  - あなたは何人中何位ですのような表記を作る
  - ログイン機能最初はなし
    - 作る場合
      - 内部機能を知る意味でも自作でもある
      - firebase, passportjsなど使っても良い

(additional)
- ログイン機能
  - ハードル高い
  - ダミーデータを入れておくでも最初は良い    

```
// DB側スキーマこうなる予定
interface Exercise {
  id: number;
  name: string;
  displayName: string;
  baseUnit: string;
  trainingIntensity: number;
}
interface TrainingLog {
  userId: number;
  exerciseId: number;
  date: Date;
  amount: number;
}
```