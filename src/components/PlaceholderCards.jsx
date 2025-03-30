const PlaceholderCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse"
        >
          <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
        </div>
      ))}
    </section>
  );
};

export default PlaceholderCards;
