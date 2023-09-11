import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DotComponent } from "../../components/DotComponent";
import { SelectMultipleChips } from "../../components/SelectMultipleChips";
import {
  BUY,
  COUNTRIES,
  CRYPTOCURRENCY,
  FIATCURRENCIES,
  FIXED_PRICE,
  MARKET_PRICE,
  OFFER_TAGS,
  PAYMENTMETHODS,
  SELL,
} from "../../models/constants";

export const getPaymentMethodStepForm = (
  cryptoCurrency: string,
  buySellOffer: string,
  paymentMethod: string,
  preferredCurrency: string,
  handleChangeCryptoCurrency: (event: SelectChangeEvent) => void,
  handleChangeBuySellOffer: (event: SelectChangeEvent) => void,
  handleChangePaymentMethod: (event: SelectChangeEvent) => void,
  handleChangePreferredCurrency: (event: SelectChangeEvent) => void
): JSX.Element => {
  return (
    <>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">
          Choose your cryptocurrency
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={cryptoCurrency}
          label="Choose your cryptocurrency"
          onChange={handleChangeCryptoCurrency}
        >
          <MenuItem value={CRYPTOCURRENCY}>{CRYPTOCURRENCY}</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">
          What would you like to do?
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={buySellOffer}
          label="What would you like to do?"
          onChange={handleChangeBuySellOffer}
        >
          <MenuItem value={BUY}>{BUY}</MenuItem>
          <MenuItem value={SELL}>{SELL}</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">Payment Method</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={paymentMethod}
          label="Payment Method"
          onChange={handleChangePaymentMethod}
        >
          {PAYMENTMETHODS.map((paymentMethod) => (
            <MenuItem value={paymentMethod}>{paymentMethod}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">Preferred Currency</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={preferredCurrency}
          label="Preferred Currency"
          onChange={handleChangePreferredCurrency}
        >
          {FIATCURRENCIES.map((currencyDetails) => (
            <MenuItem value={currencyDetails.key}>
              {currencyDetails.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export const getPricingStepForm = (
  cryptoCurrency: string,
  preferredCurrency: string,
  cryptoCurrencyRate: string,
  minOfferTradeLimit: number,
  maxOfferTradeLimit: number,
  offerMargin: number,
  handleCryptoCurrencyRate: (event: SelectChangeEvent) => void,
  handleChangeMinOfferTradeLimit: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  handleChangeMaxOfferTradeLimit: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  handleChangeOfferMargin: (event: React.ChangeEvent<HTMLInputElement>) => void
): JSX.Element => {
  return (
    <>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">
          {`Choose ${cryptoCurrency} rate you want to use`}
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={cryptoCurrencyRate}
          label={`Choose ${cryptoCurrency} rate you want to use`}
          onChange={handleCryptoCurrencyRate}
        >
          <MenuItem value={MARKET_PRICE}>{MARKET_PRICE}</MenuItem>
          <MenuItem value={FIXED_PRICE}>{FIXED_PRICE}</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel htmlFor="outlined-adornment-amount">Minimum</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">{`${preferredCurrency}`}</InputAdornment>
          }
          label="Minimum"
          value={minOfferTradeLimit}
          onChange={handleChangeMinOfferTradeLimit}
        />
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel htmlFor="outlined-adornment-amount">Maximum</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">{`${preferredCurrency}`}</InputAdornment>
          }
          label="Maximum"
          value={maxOfferTradeLimit}
          onChange={handleChangeMaxOfferTradeLimit}
        />
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel htmlFor="outlined-adornment-amount">
          Offer Margin
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">%</InputAdornment>}
          label="Offer Margin"
          value={offerMargin}
          onChange={handleChangeOfferMargin}
        />
      </FormControl>
    </>
  );
};

export const getOtherSettingsStepsForm = (
  offersTags: string[],
  setOffersTags: React.Dispatch<React.SetStateAction<string[]>>,
  offerLocation: string,
  offerTimeLimit: string,
  handleChangeOfferLocation: (event: SelectChangeEvent) => void,
  handleChangeOfferTimeLimit: (event: SelectChangeEvent) => void
): JSX.Element => {
  return (
    <>
      <SelectMultipleChips
        options={OFFER_TAGS}
        label="Offer Tags"
        selectedOption={offersTags}
        setOption={setOffersTags}
      />

      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">
          Set your offer's location
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={offerLocation}
          label="Set your offer's location"
          onChange={handleChangeOfferLocation}
        >
          {COUNTRIES.map((country) => (
            <MenuItem value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">
          Set trade time limit (Mins)
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={offerTimeLimit}
          label="Set trade time limit (Mins)"
          onChange={handleChangeOfferTimeLimit}
        >
          <MenuItem value="10">10 Minutes</MenuItem>
          <MenuItem value="20">20 Minutes</MenuItem>
          <MenuItem value="30">30 Minutes</MenuItem>
          <MenuItem value="60">60 Minutes</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export const getStepsSummaryWithPoints = (
  mainSummary: string,
  summaryPoints: string[]
): JSX.Element => (
  <div className="stepsSummaryWithPointsWrapper">
    <div className="stepsSummaryWrapper">{mainSummary}</div>
    {!!summaryPoints.length && (
      <div className="stepsPointsDesWrapper">
        {summaryPoints.map((summaryPoint) => (
          <div className="eachPoint">
            <div className="stepsPointWrapper">
              <DotComponent className="summaryPoints" />
            </div>
            <div className="summaryPointDes">{summaryPoint}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);
