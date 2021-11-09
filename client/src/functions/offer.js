import axios from "axios";

export const getOffers = async () =>
  await axios.get(`${process.env.REACT_APP_API}/offers`);

export const removeOffer = async (offerId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/offer/${offerId}`, {
    headers: {
      authtoken,
    },
  });

export const createOffer = async (offer, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/offer`,
    { offer },
    {
      headers: {
        authtoken,
      },
    }
  );
