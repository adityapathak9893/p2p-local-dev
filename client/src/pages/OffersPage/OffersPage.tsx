import React from "react";
import { ListItems } from "../../components/ListItems";
import { OfferDetails } from "../../models/interfaces";

interface IOffersPageProps {
  offersList: OfferDetails[];
  isBuyOffer: boolean;
}

export const OffersPage: React.FC<IOffersPageProps> = ({
  offersList,
  isBuyOffer,
}) => {
  return <ListItems offersList={offersList} isBuyOffer={isBuyOffer} />;
};
