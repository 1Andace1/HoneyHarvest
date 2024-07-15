import { memo } from "react";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import OneCard from "../OneCard/OneCard";
// import {  Heading,  Wrap } from "@chakra-ui/react";
// import { getProducts } from "../../redux/thunkActionsCatalog";
// import { AuthState, ProductState } from "../../redux/types/states";
// import { IProducts } from "../../types/stateTypes";
// import ModalFormCreate from "../ModalForm/ModalFormCreate";

export default memo(function CommentsList(): JSX.Element {

//   const dispatch = useAppDispatch();

//   const { products } = useAppSelector(
//     (state: { productSlice: ProductState }) => state.productSlice
//   );
//   const { user } = useAppSelector(
//     (state: { authSlice: AuthState }) => state.authSlice
//   );
//   const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);

//   useEffect((): void => {
//     dispatch(getProducts());
//   }, []);

//   useEffect(() => {
//     setFilteredProducts(products);
//   }, [products]);
//   const handleFilterChange = (filter: {
//     category: string;
//     sort: string;
//     location: string;
//     starsRating: number;
//     maxPrice: number;
//   }) => {
//     console.log("++++++++++:", filter);
//     const { category, sort, location, starsRating, maxPrice } = filter;
//     const filtered = products.filter((product) => {
//       return (
//         (category ? product.category === category : true) &&
//         (sort ? product.sort === sort : true) &&
//         (location ? product.location === location : true) &&
//         (starsRating ? product.starsRating >= starsRating : true) &&
//         (maxPrice ? product.price <= maxPrice : true)
//       );
//     });
//     console.log("-------------:", filtered);
//     setFilteredProducts(filtered);
//   };
  // console.log(products);

  return (
    <>
      {/* {user?.isAdmin ? (
                <ModalFormCreate />
      ) : (
        false
      )}
      <FilterComponent onFilterChange={handleFilterChange} />
      <Wrap spacing="30px">
        {filteredProducts.length ? (
          filteredProducts.map((el: IProducts) => (
            <OneCard el={el} key={el.id} />
          ))
        ) : (
          <Heading as="h2" size="2xl">
            Каталог пуст или загружается
          </Heading>
        )}
      </Wrap> */}
    </>
  );
});
