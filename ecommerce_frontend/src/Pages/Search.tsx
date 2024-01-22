import { useState } from "react"
import ProductCard from "../Components/ProductCard"

const Search = () => {

  const [ search, setSearch]= useState("")
  const [ sort, setSort]= useState("")
  const [ maxprice, setMaxprice]= useState(100000)
  const [ perpage, setPerpage]= useState(1)
  const [ category, setCategory]= useState("")
  
  const isNext= perpage < 4;
  const isPrev=perpage >1;
  const addtocarthandle=()=>{

  }

  return (
    <div className="serach-page">
      <aside>

<h2>Filters</h2>
<div>
  <h4>Sort</h4>

<select value={sort} onChange={(e)=>setSort(e.target.value)} >
  <option value="">None</option>
  <option value="asc">Price (Low To High)</option>
  <option value="dsc">Price (high To Low)</option>
</select>
</div>

<div>
  <h4>  Max Price {maxprice || ""} </h4>
<input type="range" min={100} max={100000} value={maxprice} onChange={(e)=>setMaxprice(Number(e.target.value))} />

</div>

<div>
  <h4>Category</h4>
<select value={category} onChange={(e)=>setCategory(e.target.value)} >
  <option value="">All</option>
  <option value="">Game</option>
  <option value="">Phone</option>
</select>
</div>
      </aside>
      
      <main>
<h1 className="heading">Products</h1>
<input type="text" value={search} placeholder="Search By Name..." onChange={(e)=>setSearch(e.target.value)} />
      
      <div className="product-list">
        <ProductCard
        productId="jshajfh" name="phone" image="https://plus.unsplash.com/premium_photo-1670274606895-f2dc713f8a90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D" price={123} stock={765} handler={addtocarthandle}
/>
      </div>

      <article>
        <button disabled={!isPrev} onClick={()=>setPerpage((prev) => prev - 1 )} >
          Prev
        </button>
        <span> {perpage} of {4} </span>
        <button disabled={!isNext} onClick={()=>setPerpage((prev) => prev + 1 )}> Next</button>
      </article>
      </main>
  
    </div>
  )
}

export default Search