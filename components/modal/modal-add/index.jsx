import "./invoicesList.css";

export default function ModalAdd() {
  return (
    <div className="modalAddContainer">
      <h1>New Invoice</h1>
      <form action="">
        <h3 className="formName">Bill From</h3>
        <label htmlFor="StreetAddress">
          Street Address
          <input name="StreetAddress" type="text" placeholder="" />
        </label>
        <div>
          <label htmlFor="city">
            City
            <input type="text" name="city" id="" />
          </label>
          <label htmlFor="postCode">
            Post Code
            <input type="text" name="postCode" />
          </label>
          <label htmlFor="country">
            Country
            <input type="text" name="country" id="" />
          </label>
        </div>
      </form>
    </div>
  );
}
