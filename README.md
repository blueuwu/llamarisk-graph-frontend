# LlamaRisk Assessment

Backend For the assessment, you can find the backend repo [here](https://github.com/blueuwu/llamarisk-graph-api)

Assessment [link] (https://hackmd.io/8oCMkpWvS9KH_mqoGhBFWA)

## Features

- Real-time price updates every 30 seconds
- Interactive price chart with ECharts
- Multiple time period views (Current, 1h ago, 24h ago)
- Daily high/low price indicators
- Optional trend line visualization
- Responsive design for mobile and desktop
- 
## Tech Stack

- **Frontend Framework**: Next.js 15.0
- **GraphQL Client**: Apollo Client
- **Charting Library**: ECharts
- **Styling**: Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql/
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```
