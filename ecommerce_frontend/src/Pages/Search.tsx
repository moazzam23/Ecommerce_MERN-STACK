import { useState } from "react";
import ProductCard from "../Components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductQuery,
} from "../Redux/Api/productApi";
import toast from "react-hot-toast";
import { Error } from "../Types/Apitypes";

const Search = () => {
  const {
    data: Categorydata,
    isError,
    error,
    isLoading: categoryloading,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [price, setprice] = useState(100000);
  const [perpage, setPerpage] = useState(1);
  const [category, setCategory] = useState("");

  const {
    isLoading: searchloading,
    isError: searchiserror,
    error: searcherror,
    data: searchData,
  } = useSearchProductQuery({
    search,
    sort,
    price,
    perpage,
    category,
  });

  const isNext = perpage < 4;
  const isPrev = perpage > 1;

  if (isError) {
    toast.error((error as Error).data.message);
  }
  if (searchiserror) {
    toast.error((searcherror as Error).data.message);
  }

  const addtocarthandle = () => {};

  return (
    <div className="serach-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="dsc">Price (Low To High)</option>
            <option value="asc">Price (high To Low)</option>
          </select>
        </div>

        <div>
          <h4> Max Price {price || ""} </h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={price}
            onChange={(e) => setprice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!categoryloading &&
              Categorydata?.product.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1 className="heading">Products</h1>
        <input
          type="text"
          value={search}
          placeholder="Search By Name..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="product-list">
          {!searchloading &&
            searchData?.product.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                image={i.image}
                price={i.price}
                stock={i.stock}
                handler={addtocarthandle}
              />
            ))}
        </div>
        {searchData && searchData.totalpage > 1 && (
          <article>
            <button
              disabled={!isPrev}
              onClick={() => setPerpage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {" "}
              {perpage} of {searchData.totalpage}
            </span>
            <button
              disabled={!isNext}
              onClick={() => setPerpage((prev) => prev + 1)}
            >
              {" "}
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
