import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { Box, Button, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FIATCURRENCIES } from "../../models/constants";
import { OfferDetails } from "../../models/interfaces";
import { BackGroundAvatar } from "../BackGroundAvatar";

export interface IListItemsProps {
  offersList: OfferDetails[];
  isBuyOffer: boolean;
  isButtonDisabled?: boolean;
}

export const ListItems: React.FC<IListItemsProps> = ({
  offersList,
  isBuyOffer,
  isButtonDisabled = false,
}) => {
  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const lightTheme = createTheme({ palette: { mode: "light" } });
  const handleBuySellClick = (email: string, userName: string) => {
    navigate(
      `/BuySell?email=${email}&userName=${userName}&isBuyOffer=${isBuyOffer}`
    );
  };
  return (
    <ThemeProvider theme={lightTheme}>
      {offersList.map((offer, index) => {
        const currencyDetails = FIATCURRENCIES.filter(
          (fiatCurrencyDetails) =>
            fiatCurrencyDetails.key === offer.preferredCurrency
        )[0];
        const currentCryptoPrice = Number(currencyDetails.price);
        const offeredPrice =
          offer.offerMargin === 0 || offer.offerMargin === null
            ? currentCryptoPrice
            : currentCryptoPrice +
              currentCryptoPrice * (offer.offerMargin / 100);
        return (
          <Item key={index} elevation={6} sx={{ marginBottom: "20px" }}>
            <ListItem alignItems="flex-start" sx={{ padding: "16px" }}>
              <ListItemAvatar>
                <Tooltip title={offer.userName}>
                  <BackGroundAvatar
                    userName={offer.userName}
                    width={50}
                    height={50}
                  />
                </Tooltip>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link
                    to={`/user/${offer.email}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                        color: "#1976d2",
                        cursor: "pointer",
                      }}
                    >
                      {offer.userName}
                    </Typography>
                  </Link>
                }
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      minHeight: "120px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                        flex: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          <AccessTimeOutlinedIcon sx={{ marginRight: 0.5 }} />
                          Time limit:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          {`Within ${offer.offerTimeLimit} mins`}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          <LocationOnIcon sx={{ marginRight: 0.5 }} />
                          Location:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          {offer.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          flexWrap="wrap"
                          sx={{ marginRight: "10px" }}
                        >
                          {offer.offersTags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              color="secondary"
                              size="small"
                              sx={{ marginRight: 0.5 }}
                            />
                          ))}{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                        flex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          Minimum:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          <Chip
                            label={`${offer.minAmount} ${offer.preferredCurrency}`}
                            color="info"
                            size="small"
                          />
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          Maximum:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          <Chip
                            label={`${offer.maxAmount} ${offer.preferredCurrency}`}
                            color="info"
                            size="small"
                          />
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          <PaymentsOutlinedIcon sx={{ marginRight: 0.5 }} />
                          Payment:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          {`${offer.paymentMethod}`}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                        flex: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          display="flex"
                          alignItems="center"
                          sx={{
                            fontWeight: "bold",
                            color: "text.secondary",
                            marginRight: "10px",
                          }}
                        >
                          {`Offered price/${offer.cryptoCurrency}:`}
                        </Typography>
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          sx={{
                            fontWeight: "bold",
                            color: "#1976d2",
                          }}
                        >
                          {`${offeredPrice} ${offer.preferredCurrency}`}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          display="flex"
                          alignItems="center"
                          sx={{
                            fontWeight: "bold",
                            color: "text.secondary",
                            marginRight: "10px",
                          }}
                        >
                          {`Current price/${offer.cryptoCurrency}:`}
                        </Typography>
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                          sx={{
                            fontWeight: "bold",
                            color: "#1976d2",
                          }}
                        >
                          {`${currentCryptoPrice} ${offer.preferredCurrency}`}
                        </Typography>
                      </Box>
                      {!!offer.offerMargin && (
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="body1"
                            display="flex"
                            alignItems="center"
                            sx={{
                              fontWeight: "bold",
                              marginRight: "10px",
                              color: `${
                                offer.offerMargin >= 0 ? "green" : "red"
                              }`,
                            }}
                          >
                            {`${offer.offerMargin}%`}
                          </Typography>
                          <Typography
                            variant="body1"
                            display="flex"
                            alignItems="center"
                            sx={{
                              fontWeight: "bold",
                              marginRight: "10px",
                              borderRadius: "10px",
                            }}
                          >
                            <Button
                              color="primary"
                              disabled={isButtonDisabled}
                              onClick={() =>
                                handleBuySellClick(offer.email, offer.userName)
                              }
                            >
                              {isBuyOffer
                                ? `Buy ${offer.cryptoCurrency}`
                                : `Sell ${offer.cryptoCurrency}`}
                            </Button>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </Item>
        );
      })}
    </ThemeProvider>
  );
};
