const loadingGif = "./images/loading.gid";

const Loading = () => {
  return (
    <div className="loader">
      <img src={loadingGif} alt="loading" />
      <h3>WCZYTYWANIE...</h3>
    </div>
  );
};

export default Loading;
