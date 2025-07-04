# 家計簿アプリ - 初心者向け仕様書（修正版）

## 学習者のレベル
* **React**: 初心者（useState/useContext/useReducer/useEffectを学習中）
* **Tailwind CSS**: 未経験（触ったことがない）
* **目標**: 4つのReactフック・Tailwind CSSを実践的に習得する

## 作るもの
お金の収入と支出を記録して、月ごとに集計できる簡単な家計簿アプリ

## 基本機能
1. **お金の記録**
   * 収入か支出かを選ぶ
   * 金額を入力する
   * カテゴリを選ぶ（食費、給料など）
   * 追加ボタンで保存

2. **月別の集計**
   * 今月の収入・支出・残高を自動計算
   * 月を変更できる

3. **履歴の表示**
   * 記録したデータを一覧表示
   * 削除できる

4. **カテゴリ管理**
   * デフォルトカテゴリの提供
   * 新しいカテゴリを追加
   * 不要なカテゴリを削除
   * 全コンポーネントでカテゴリを共有

## Reactフックの使い方

### useState
* フォームの入力値（金額、カテゴリなど）
* カテゴリ管理パネルの表示状態
* 新しいカテゴリ入力値

### useContext
* **カテゴリデータを全コンポーネントで共有**
* 収入・支出のカテゴリリスト
* カテゴリの追加・削除機能

### useReducer
* お金のデータを管理する（追加、削除）
* カテゴリデータを管理する（追加、削除）

### useEffect
* 月が変わったら自動で集計を計算し直す
* カテゴリが変更されたら関連データを更新

## データの形

```javascript
// 1つの取引データ
{
  id: 1,
  type: "expense",        // "income" または "expense"
  amount: 1500,          // 金額
  category: "食費",       // カテゴリ
  date: "2025-06-27",    // 日付
  description: "ランチ"   // メモ
}

// カテゴリデータ
{
  income: ["給料", "副業", "その他収入"],
  expense: ["食費", "交通費", "娯楽費", "光熱費", "その他支出"]
}
```

## 作る順番
1. **基本の画面を作る**（コンポーネント分割）
2. **カテゴリ管理を作る**（useContext + useReducer使用）
3. **フォームを作る**（useState使用、カテゴリはContextから取得）
4. **データを管理する**（useReducer使用）
5. **自動計算する**（useEffect使用）
6. **見た目を整える**

## デフォルトカテゴリ
* **収入**: 給料、副業、その他収入
* **支出**: 食費、交通費、娯楽費、光熱費、その他支出

## 完成イメージ
 **参考ファイル**：[./reference.jsx](./reference.jsx)
* 左側：入力フォーム（カテゴリはContextから取得）
* 中央：月別集計（カテゴリ別の内訳も表示）
* 右側：取引履歴
* 上側：カテゴリ管理ボタン