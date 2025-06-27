import { Plus, Tag, Trash2 } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// 1. useContext用のカテゴリコンテキストを作成
const CategoryContext = createContext();

// 2. カテゴリ管理用のReducer
const categoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_INCOME_CATEGORY":
      return {
        ...state,
        income: [...state.income, action.payload],
      };
    case "ADD_EXPENSE_CATEGORY":
      return {
        ...state,
        expense: [...state.expense, action.payload],
      };
    case "DELETE_INCOME_CATEGORY":
      return {
        ...state,
        income: state.income.filter((cat) => cat !== action.payload),
      };
    case "DELETE_EXPENSE_CATEGORY":
      return {
        ...state,
        expense: state.expense.filter((cat) => cat !== action.payload),
      };
    default:
      return state;
  }
};

// 3. 取引データ用のReducer
const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, { ...action.payload, id: Date.now() }];
    case "DELETE_TRANSACTION":
      return state.filter((transaction) => transaction.id !== action.payload);
    default:
      return state;
  }
};

// 4. カテゴリプロバイダーコンポーネント（useContext用）
const CategoryProvider = ({ children }) => {
  // デフォルトカテゴリ
  const initialCategories = {
    income: ["給料", "副業", "その他収入"],
    expense: ["食費", "交通費", "娯楽費", "光熱費", "その他支出"],
  };

  const [categories, dispatch] = useReducer(categoryReducer, initialCategories);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        dispatch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// 5. カテゴリ管理パネルコンポーネント
const CategoryManagementPanel = ({ isOpen, onClose }) => {
  const { categories, dispatch } = useContext(CategoryContext);
  const [newIncomeCategory, setNewIncomeCategory] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState("");

  if (!isOpen) return null;

  const handleAddIncomeCategory = () => {
    if (
      newIncomeCategory.trim() &&
      !categories.income.includes(newIncomeCategory.trim())
    ) {
      dispatch({
        type: "ADD_INCOME_CATEGORY",
        payload: newIncomeCategory.trim(),
      });
      setNewIncomeCategory("");
    }
  };

  const handleAddExpenseCategory = () => {
    if (
      newExpenseCategory.trim() &&
      !categories.expense.includes(newExpenseCategory.trim())
    ) {
      dispatch({
        type: "ADD_EXPENSE_CATEGORY",
        payload: newExpenseCategory.trim(),
      });
      setNewExpenseCategory("");
    }
  };

  const handleDeleteIncomeCategory = (category) => {
    // デフォルトカテゴリは削除不可
    if (["給料", "副業", "その他収入"].includes(category)) return;
    dispatch({
      type: "DELETE_INCOME_CATEGORY",
      payload: category,
    });
  };

  const handleDeleteExpenseCategory = (category) => {
    // デフォルトカテゴリは削除不可
    if (["食費", "交通費", "娯楽費", "光熱費", "その他支出"].includes(category))
      return;
    dispatch({
      type: "DELETE_EXPENSE_CATEGORY",
      payload: category,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">カテゴリ管理</h3>

        {/* 収入カテゴリ管理 */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 text-green-700">収入カテゴリ</h4>

          {/* 新しいカテゴリ追加 */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newIncomeCategory}
              onChange={(e) => setNewIncomeCategory(e.target.value)}
              placeholder="新しいカテゴリ名"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddIncomeCategory}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* カテゴリ一覧 */}
          <div className="space-y-1">
            {categories.income.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between p-2 bg-green-50 rounded"
              >
                <span>{category}</span>
                {!["給料", "副業", "その他収入"].includes(category) && (
                  <button
                    onClick={() => handleDeleteIncomeCategory(category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 支出カテゴリ管理 */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 text-red-700">支出カテゴリ</h4>

          {/* 新しいカテゴリ追加 */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value)}
              placeholder="新しいカテゴリ名"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddExpenseCategory}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* カテゴリ一覧 */}
          <div className="space-y-1">
            {categories.expense.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between p-2 bg-red-50 rounded"
              >
                <span>{category}</span>
                {!["食費", "交通費", "娯楽費", "光熱費", "その他支出"].includes(
                  category
                ) && (
                  <button
                    onClick={() => handleDeleteExpenseCategory(category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

// 6. 入力フォームコンポーネント（useState + useContext使用）
const TransactionForm = ({ onAddTransaction }) => {
  const { categories } = useContext(CategoryContext); // Context からカテゴリを取得

  // useState：フォームの各入力値を管理
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // typeが変更されたときにカテゴリをリセット
  useEffect(() => {
    if (type === "income" && categories.income.length > 0) {
      setCategory(categories.income[0]);
    } else if (type === "expense" && categories.expense.length > 0) {
      setCategory(categories.expense[0]);
    }
  }, [type, categories]);

  // 初期カテゴリの設定
  useEffect(() => {
    if (!category) {
      if (type === "income" && categories.income.length > 0) {
        setCategory(categories.income[0]);
      } else if (type === "expense" && categories.expense.length > 0) {
        setCategory(categories.expense[0]);
      }
    }
  }, [categories, type, category]);

  const handleSubmit = () => {
    if (!amount || !category) return;

    // 新しい取引データを作成
    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split("T")[0],
    };

    onAddTransaction(newTransaction);

    // フォームをリセット
    setAmount("");
    setDescription("");
  };

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold mb-4">収支を記録</h2>

      <div>
        {/* 収入・支出の選択 */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">種類</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              収入
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              支出
            </label>
          </div>
        </div>

        {/* 金額入力 */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">金額 (¥)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* カテゴリ選択（Contextから取得） */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {categories[type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* メモ入力 */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">メモ</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="ランチ代など"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          追加
        </button>
      </div>
    </div>
  );
};

// 7. 月別集計コンポーネント（useEffect使用）
const MonthlySummary = ({ transactions, selectedMonth, onMonthChange }) => {
  const { categories } = useContext(CategoryContext);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    categoryBreakdown: { income: {}, expense: {} },
  });

  // useEffect：月が変わったら集計を再計算
  useEffect(() => {
    const monthTransactions = transactions.filter((t) =>
      t.date.startsWith(selectedMonth)
    );

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // カテゴリ別の集計
    const categoryBreakdown = { income: {}, expense: {} };

    // 収入カテゴリ別集計
    categories.income.forEach((cat) => {
      categoryBreakdown.income[cat] = monthTransactions
        .filter((t) => t.type === "income" && t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    // 支出カテゴリ別集計
    categories.expense.forEach((cat) => {
      categoryBreakdown.expense[cat] = monthTransactions
        .filter((t) => t.type === "expense" && t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    setSummary({
      income,
      expense,
      balance: income - expense,
      categoryBreakdown,
    });
  }, [transactions, selectedMonth, categories]); // categories も依存配列に追加

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold mb-4">月別集計</h2>

      {/* 月選択 */}
      <div className="mb-4">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* 全体集計 */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center p-3 bg-green-100 rounded">
          <span className="text-green-800 font-medium">収入</span>
          <span className="text-green-800 font-bold">
            ¥{summary.income.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-red-100 rounded">
          <span className="text-red-800 font-medium">支出</span>
          <span className="text-red-800 font-bold">
            ¥{summary.expense.toLocaleString()}
          </span>
        </div>

        <div
          className={`flex justify-between items-center p-3 rounded ${
            summary.balance >= 0 ? "bg-blue-100" : "bg-orange-100"
          }`}
        >
          <span
            className={`font-medium ${
              summary.balance >= 0 ? "text-blue-800" : "text-orange-800"
            }`}
          >
            残高
          </span>
          <span
            className={`font-bold ${
              summary.balance >= 0 ? "text-blue-800" : "text-orange-800"
            }`}
          >
            ¥{summary.balance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* カテゴリ別内訳 */}
      <div>
        <h3 className="font-medium mb-2">カテゴリ別内訳</h3>

        {/* 収入カテゴリ別 */}
        <div className="mb-3">
          <h4 className="text-sm font-medium text-green-700 mb-1">収入</h4>
          {Object.entries(summary.categoryBreakdown.income)
            .filter(([, amount]) => amount > 0)
            .map(([category, amount]) => (
              <div key={category} className="flex justify-between text-sm py-1">
                <span>{category}</span>
                <span className="text-green-600">
                  ¥{amount.toLocaleString()}
                </span>
              </div>
            ))}
        </div>

        {/* 支出カテゴリ別 */}
        <div>
          <h4 className="text-sm font-medium text-red-700 mb-1">支出</h4>
          {Object.entries(summary.categoryBreakdown.expense)
            .filter(([, amount]) => amount > 0)
            .map(([category, amount]) => (
              <div key={category} className="flex justify-between text-sm py-1">
                <span>{category}</span>
                <span className="text-red-600">¥{amount.toLocaleString()}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// 8. 取引履歴コンポーネント
const TransactionHistory = ({
  transactions,
  onDeleteTransaction,
  selectedMonth,
}) => {
  // 選択された月の取引のみ表示
  const filteredTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <h2 className="text-xl font-bold mb-4">取引履歴</h2>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          この月の取引はありません
        </p>
      ) : (
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded border border-gray-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type === "income" ? "収入" : "支出"}
                  </span>
                  <span className="font-medium">{transaction.category}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {transaction.description} • {transaction.date}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}¥
                  {transaction.amount.toLocaleString()}
                </span>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 9. メインアプリコンポーネント
const HouseholdBudgetApp = () => {
  // useReducer：取引データの管理
  const [transactions, dispatch] = useReducer(transactionReducer, []);

  // useState：その他の状態管理
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);

  // 取引追加ハンドラー
  const handleAddTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  // 取引削除ハンドラー
  const handleDeleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">家計簿アプリ</h1>
          <button
            onClick={() => setShowCategoryManagement(true)}
            className="p-2 rounded hover:bg-gray-100 flex items-center gap-2"
          >
            <Tag className="w-5 h-5" />
            <span>カテゴリ管理</span>
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側：入力フォーム */}
          <div className="lg:col-span-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>

          {/* 中央：月別集計 */}
          <div className="lg:col-span-1">
            <MonthlySummary
              transactions={transactions}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
            />
          </div>

          {/* 右側：取引履歴 */}
          <div className="lg:col-span-1">
            <TransactionHistory
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              selectedMonth={selectedMonth}
            />
          </div>
        </div>
      </main>

      {/* カテゴリ管理パネル */}
      <CategoryManagementPanel
        isOpen={showCategoryManagement}
        onClose={() => setShowCategoryManagement(false)}
      />
    </div>
  );
};

// 10. アプリのエントリーポイント
export default function App() {
  return (
    <CategoryProvider>
      <HouseholdBudgetApp />
    </CategoryProvider>
  );
}
