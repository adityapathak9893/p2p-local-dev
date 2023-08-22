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
          <MenuItem value="Bitcoin">Bitcoin</MenuItem>
          <MenuItem value="Tether">Tether</MenuItem>
          <MenuItem value="USD Coin">USD Coin</MenuItem>
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
          <MenuItem value="Buy">Buy</MenuItem>
          <MenuItem value="Sell">Sell</MenuItem>
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
          <MenuItem value="Paypal">Paypal</MenuItem>
          <MenuItem value="Bank">Bank</MenuItem>
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
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EURO">EURO</MenuItem>
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
          <MenuItem value="Market price">Market price</MenuItem>
          <MenuItem value="Fixed price">Fixed price</MenuItem>
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
  offerOwnerLocation: string,
  handleChangeOfferLocation: (event: SelectChangeEvent) => void,
  handleChangeOfferOwnerLocation: (event: SelectChangeEvent) => void
): JSX.Element => {
  return (
    <>
      <SelectMultipleChips
        options={[
          "No verification needed",
          "verified paypal only",
          "receipt required",
        ]}
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
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Germany">Germany</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 120, width: "50%" }}
        margin="normal"
        size="medium"
      >
        <InputLabel id="demo-select-small-label">Set your location</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={offerOwnerLocation}
          label="Set your location"
          onChange={handleChangeOfferOwnerLocation}
        >
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Germany">Germany</MenuItem>
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
