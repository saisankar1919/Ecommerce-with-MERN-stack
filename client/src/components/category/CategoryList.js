// import ButtonGroup from "antd/lib/button/button-group";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
// import { Button,ButtonGroup } from '@material-ui/core';;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col m-3 container"
      >
        <Link style={{ color: "black", margin:'auto' }} to={`/category/${c.slug}`}>
          {c.name}
        </Link>
      </div>
    ));

  return (
    <div className="" style={{backgroundColor:'rgb(217 206 188)', margin:'auto',boxShadow: '5px 5px 8px 5px #888888'}}>
      <div className="container" style={{display: 'flex',flexWrap:' wrap',marginRight: '-15px'}}>
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
      
    </div>
  );
};

export default CategoryList;
