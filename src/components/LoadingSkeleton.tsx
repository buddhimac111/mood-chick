const LoadingSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
