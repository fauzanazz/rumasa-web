# Rumasa Web

Website untuk Rumasa - platform pembangunan rumah modular dengan desain fleksibel.

## Tentang Rumasa

Rumasa menyediakan solusi pembangunan rumah dengan:
- Desain modular yang terjamin kualitas
- Estimasi biaya yang transparan

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Integration**: Google Sheets API, WhatsApp API

## Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd rumasa-web

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi yang sesuai

# Run development server
bun run dev
```

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Features

- **Hero Section** - Landing page dengan CTA
- **Home Layout Configurator** - Tool konfigurasi denah rumah
- **Popular Designs** - Galeri desain populer
- **Why Choose Rumasa** - Keunggulan platform
- **Contact Forms** - Form konsultasi dan estimasi
- **WhatsApp Integration** - Chat langsung via WhatsApp

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── sections/        # Page sections
│   └── ui/             # UI components
├── config/             # Configuration files
├── lib/                # Utility functions
├── types/              # TypeScript types
└── public/             # Static assets
```

## Environment Variables

Pastikan untuk mengatur environment variables berikut:

```env
# Google Sheets API
GOOGLE_SHEETS_CREDENTIALS=

# WhatsApp API
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
```

## License

© Rumasa
