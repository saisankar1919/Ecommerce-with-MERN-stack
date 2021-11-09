import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getOffers,
  removeOffer,
  createOffer,
} from "../../../functions/offer";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories } from "../../../functions/category";
import { useHistory } from "react-router";


const CreateOfferPage = () => {
  
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState('');
  const [category, setCategory] = useState("");

  console.log(expiry)
  console.log(categories)
  

  const history = useHistory();

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOffers();
    loadCategories();

  }, []);

  const loadAllOffers = () => getOffers().then((res) => setOffers(res.data));

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data ));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createOffer({ name, expiry, discount, category:category }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllOffers(); // load all offers
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`Offer created`);
      })
      .catch((err) => {toast.error('Offer already exist for the category')
      setLoading(false)
    })
  };

  const handleRemove = (offerId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeOffer(offerId, user.token)
        .then((res) => {
          loadAllOffers(); // load all offers
          setLoading(false);
          toast.error(`Offer deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  // const handleCatagoryChange = (e) => {
  //   e.preventDefault();
  //   setCategories({ categories, [e.target.name]: e.target.value });
  // };

  return (
    <div className="" style={{marginTop:'78px'}}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Offer</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Offer Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>----Please select----</option>
          {categories.length > 0 &&
            categories.map((c) => (
              
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                maxLength='2'
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
              <div style={{textAlign:'center'}}>
                  <button className="btn btn-outline-primary" style={{borderColor:'rgb(87, 67, 67)',color:'rgb(87, 67, 67)'}}>Save</button>

              </div>
          </form>

          <br />
              
          <h4>{offers.length} Offers</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {offers.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateOfferPage;
