import {useSelector} from "react-redux";


function FavoritePage() {
  const data = useSelector((state) => state.cart.data)

  return (
    <div>
      {data.map((detailMovie) => (
        <div key={detailMovie.id}>
          <p>{detailMovie.title || detailMovie.name}</p>
        </div>
      ))}
    </div>
  );
}

export default FavoritePage;