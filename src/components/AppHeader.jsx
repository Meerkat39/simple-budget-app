import { FiSettings } from 'react-icons/fi';

const AppHeader = ({ onCategoryManageClick }) => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 py-4 px-8 flex justify-between items-center text-white shadow-2xl rounded-b-lg">
      <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">家計簿アプリ</h1>
      <button
        onClick={onCategoryManageClick}
        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out flex items-center"
      >
        <FiSettings className="mr-2" />
        カテゴリ管理
      </button>
    </header>
  );
};

export default AppHeader;
