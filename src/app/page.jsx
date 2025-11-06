import AddUser from "./_components/AddUser";

export const metadata = {
  title: "Web 5",
  description: "Gabarit de départ - Web 5",
};

const Home = async () => {
  return (
    <div className="flex h-screen font-mono text-gray-900 bg-gray-100">
      <div className="w-1/3 p-8 m-auto bg-gray-300 border border-gray-700 rounded-lg">
        <h1 className="mb-6 text-lg font-bold text-center">
          Haiku-Online
        </h1>
        <AddUser />
      </div>
    </div>
  );
};
export default Home;
