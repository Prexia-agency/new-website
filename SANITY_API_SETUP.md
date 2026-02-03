## Sanity API setup (required)

Open `sanity.io/manage` → your project → **API**.

### 1) Add CORS origins
Add these origins (and any staging domains you use):
- `http://localhost:3000`
- `https://www.prexia.com`

### 2) Create a read token
In **Tokens** create a new token with **Viewer** permission.

Then set it in `ak/.env.local` as:

```bash
SANITY_API_READ_TOKEN=YOUR_VIEWER_READ_TOKEN
```

### 3) (Optional) Public dataset
If you later enable public read for the dataset, you can remove the token and the site will use the CDN for faster reads.


