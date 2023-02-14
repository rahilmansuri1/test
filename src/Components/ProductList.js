import { useEffect } from "react";
import Card from "./Card";


function ProductList({ products, page, setPage, loading }) {
    useEffect(() => {
        if (products.length === 0 && page > 1) {
            setPage(page - 1);
        }
    }, [page, setPage, products.length]);

    if (products.length < 0 && page === 1) {
        return <div className="text-white mt-[2%]">No Products Found</div>;
    }
    return (
        <div className="grid grid-cols-3 ml-[5%] mt-[-2%] mb-[2%] grid-flow-row">
            {!loading ? products.map((product, i) => {
                return product.show ?
                    <Card
                        product={product} key={i}
                    />
                    :
                    <div className="text-white mt-[2%]">No Products Found</div>
            })
                :
                <h5 className="mt-[50px] text-white text-lg">Loading... &#160;  <span>!!</span></h5>
            }
        </div>
    )
}
export default ProductList;
