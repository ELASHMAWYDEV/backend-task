# Environment variables
- `DB_URI`: The url for mongodb connection

# Run the project
- `npm start`

## Request Sample
- `/AddCartItem`
*All params must be on query params liske: /AddCartItem?order_id=56416&quantity=1*

```javascript
  {
    transaction_date: 2021-06-21T08:47:30.000Z,
    sku_number: 'WF00063',
    quantity: 1,
    etransaction_id: 'AD5E24E53566413156778C4A5CF37484',
    transaction_type: 'realtime',
    product_name: 'Thirst Trap Juice Serum Sachet Sample 3ml',
    offer_id: 791575,
    advertiser_id: '45966',
    sid: 3824918,
    is_event: 'N',
    commissions: '0',
    process_date: 2021-06-21T08:47:47.000Z,
    currency: 'USD',
    u1: '480b16bb3137685134f0364d95ffdf135bc361af',
    order_id: '02313370',
    sale_amount: 0
  }
```
