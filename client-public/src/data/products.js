export const categories = ['Furniture', 'Workspace', 'Storage', 'Textile']

export const products = [
  { id: 1, name: 'MILLBERGET', category: 'Furniture', price: 1599000, stock: 13, author: 'admin@mail.com',
    description: 'Swivel chair, murum black. Kursi putar yang nyaman untuk bekerja berjam-jam.',
    imgUrl: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/201/1020142_PE831799_S4.jpg' },
  { id: 2, name: 'MICKE', category: 'Workspace', price: 1799000, stock: 30, author: 'admin@mail.com',
    description: 'Desk, black-brown, 105x50 cm.',
    imgUrl: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/359/0735981_PE740299_S4.jpg' },
  { id: 3, name: 'ALEX', category: 'Storage', price: 1370000, stock: 12, author: 'admin@mail.com',
    description: 'Drawer unit, white, 36x70 cm.',
    imgUrl: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/777/0977775_PE813763_S3.jpg' },
  { id: 4, name: 'SOCKERBIT', category: 'Storage', price: 59900, stock: 42, author: 'admin@mail.com',
    description: 'Storage box with lid, grey-green, 19x26x15 cm.',
    imgUrl: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/290/1029026_PE835627_S3.jpg' },
]

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)