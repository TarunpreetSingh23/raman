"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const products = [
  {
    id: 6,
    name: 'HP Slim Laptop 14"',
    description: 'This sleek laptop is built for performance and portability. It features an efficient i3 processor and 8GB of RAM, making it perfect for multitasking and handling daily tasks with ease. With a spacious 512GB SSD, you get quick boot times and plenty of storage for all your files. It comes pre-installed with the latest Windows 11 operating system, providing a modern and secure user experience. The slim design and lightweight build make it an excellent choice for students and professionals on the go.',
    price: 629.0,
    originalPrice: 899.0,
    discount: '30%',
    image: '/New_folder/laptop.jpg',
    category: 'electronic',
    rating: 4.2,
    highlights: ['i3 processor', '8GB RAM', '512GB SSD', 'Windows 11', 'Portable', 'Study/work'],
  },
  {
    id: 2,
    name: 'Boat Bluetooth Speaker',
    description: 'Experience powerful audio with this portable Bluetooth speaker. Its waterproof design ensures you can enjoy your music anywhere, from poolside parties to outdoor adventures. The speaker is engineered to deliver deep, rich bass that fills the room. It’s compact and travel-friendly, making it easy to pack in your bag. The long-lasting rechargeable battery provides hours of uninterrupted playback, so the music never has to stop.',
    price: 79.99,
    originalPrice: 119.99,
    discount: '33%',
    image: '/New_folder/boat_bluetooth.webp',
    category: 'electronic',
    rating: 4.5,
    highlights: ['Portable', 'Waterproof', 'Deep bass', 'Rechargeable', 'Travel-friendly', 'Durable'],
  },
  {
    id: 12,
    name: 'boat Headphones',
    description: 'Enjoy a superior listening experience with these high-quality headphones. They deliver clear stereo sound, bringing your music, podcasts, and calls to life. The headphones feature comfortable ear cushions for extended wear and a foldable design that makes them easy to store and carry. They are compatible with any device that has a 3.5mm jack, offering universal connectivity. The durable build ensures they can withstand daily use.',
    price: 29.99,
    originalPrice: 45.0,
    discount: '33%',
    image: '/New_folder/headphones.jpg',
    category: 'electronic',
    rating: 4.0,
    highlights: ['Stereo sound', 'Comfortable', 'Foldable', '3.5mm jack', 'Durable', 'Travel-friendly'],
  },
  {
    id: 9,
    name: 'Logitech HD Webcam',
    description: 'Enhance your video calls with this 1080p Full HD webcam. It captures clear and crisp video, making sure you look your best during virtual meetings and streams. The built-in noise-reduction microphone filters out background sounds, so your voice comes through loud and clear. With its autofocus feature, it keeps you in sharp focus even if you move. This is an essential accessory for anyone who works or studies from home.',
    price: 59.0,
    originalPrice: 89.0,
    discount: '33%',
    image: '/New_folder/webcam.webp',
    category: 'electronic',
    rating: 4.6,
    highlights: ['1080p HD', 'Autofocus', 'Noise-reduction', 'Plug-and-play', 'Meetings', 'Streaming'],
  },
  {
    id: 3,
    name: 'boat Smart Watch',
    description: 'This smartwatch is your perfect health and fitness companion. It monitors your heart rate continuously, providing real-time data to help you stay on top of your health. With a impressive 7-day battery backup, you can wear it all week without needing to charge. Its comprehensive fitness tracking features help you monitor your workouts and daily activity. The water-resistant design means you don\'t have to take it off for a swim or when washing your hands.',
    price: 59.99,
    originalPrice: 90.0,
    discount: '33%',
    image: '/New_folder/noise_smart_watch.webp',
    category: 'electronic',
    rating: 4.1,
    highlights: ['Heart rate', 'Fitness tracking', '7-day battery', 'Water-resistant', 'Health', 'Workout'],
  },
  {
    id: 4,
    name: 'OnePlus Buds Z2',
    description: 'Immerse yourself in your music with these earbuds featuring Active Noise Cancellation (ANC), which blocks out distracting sounds. With an impressive 38-hour total battery life, you can listen to your favorite tunes for days on a single charge. The Bass Boost technology provides a powerful and deep sound experience. The ergonomic fit ensures they stay comfortably in your ears, making them ideal for long listening sessions.',
    price: 89.99,
    originalPrice: 135.0,
    discount: '33%',
    image: '/New_folder/earbud.webp',
    category: 'electronic',
    rating: 4.4,
    highlights: ['ANC', '38-hour battery', 'Bass Boost', 'Ergonomic fit', 'Wireless', 'Music'],
  },
  {
    id: 5,
    name: 'Dell Wireless Mouse',
    description: 'Enjoy freedom from tangled wires with this reliable wireless mouse. Its 2.4GHz connection provides a stable and responsive experience. The compact design makes it incredibly easy to carry in your laptop bag, perfect for working on the go. It comes with a pre-installed battery, so you can start using it right out of the box. The plug-and-play setup means there is no need for complicated installations.',
    price: 19.99,
    originalPrice: 30.0,
    discount: '33%',
    image: '/New_folder/dell mouse.webp',
    category: 'electronic',
    rating: 4.3,
    highlights: ['Wireless', '2.4GHz', 'Compact', 'Plug-and-play', 'Portable', 'Efficient'],
  },
  {
    id: 7,
    name: 'Mi Power Bank 20000mAh',
    description: 'Never run out of battery again with this high-capacity 20000mAh power bank. It features dual output ports for fast charging multiple devices simultaneously. The power bank supports both USB-C and Micro USB inputs, making it compatible with a wide range of cables. Its slim and portable build makes it easy to carry in your bag or pocket. This is an essential accessory for long trips and extended outings.',
    price: 34.99,
    originalPrice: 50.0,
    discount: '30%',
    image: '/New_folder/powerbank.jpg',
    category: 'electronic',
    rating: 4.7,
    highlights: ['20000mAh', 'Fast charging', 'Dual output', 'Portable', 'USB-C input', 'Travel'],
  },
  {
    id: 8,
    name: 'Cosmic Byte Keyboard',
    description: 'This keyboard is designed to elevate your gaming and typing experience. It offers a mechanical feel that provides satisfying tactile feedback with every keystroke. The customizable RGB lighting creates an immersive ambiance for your setup. It connects via a durable USB wired connection for reliable performance. The sleek and ergonomic design ensures comfort during long sessions, whether you are working or gaming.',
    price: 49.99,
    originalPrice: 75.0,
    discount: '33%',
    image: '/New_folder/keyboard.webp',
    category: 'electronic',
    rating: 4.5,
    highlights: ['Mechanical feel', 'RGB lighting', 'USB wired', 'Ergonomic', 'Gaming', 'Durable'],
  },
  {
    id: 10,
    name: 'Realme Smart TV Stick',
    description: 'Transform your TV into a smart TV with this easy-to-use stick. It allows you to stream in full HD clarity, bringing your favorite movies and shows to life. The built-in Google Assistant makes it easy to control your entertainment with just your voice. It supports Dolby Audio for an immersive sound experience. The simple plug-in via HDMI allows for a quick and hassle-free setup.',
    price: 39.99,
    originalPrice: 60.0,
    discount: '33%',
    image: '/New_folder/stick.webp',
    category: 'electronic',
    rating: 4.2,
    highlights: ['Light weight', 'Dolby Audio', 'HDMI plug-in', 'Streaming', 'Easy setup'],
  },
  {
    id: 11,
    name: 'Canon Inkjet Printer',
    description: 'This all-in-one inkjet printer is perfect for all your home and office needs. It allows you to print, scan, and copy with ease. The wireless connectivity lets you print from your computer or smartphone without needing to be physically connected. It supports both black-and-white and color printing, delivering vibrant and professional-quality documents. Its compact design ensures it fits perfectly in any workspace.',
    price: 109.99,
    originalPrice: 160.0,
    discount: '31%',
    image: '/New_folder/printer.webp',
    category: 'electronic',
    rating: 4.0,
    highlights: ['All-in-One', 'Wireless', 'Color printing', 'Compact', 'Stylish', 'Home/Office'],
  },
  {
    id: 1,
    name: 'Smartphone XPro',
    description: 'This high-performance smartphone is designed for speed and clarity. It comes with a generous 128GB of storage and fast-charging capabilities, so you can power up quickly. The stunning 64MP high-quality camera captures incredibly detailed photos and videos. It is powered by a smooth-performing chipset, ensuring a lag-free experience whether you are gaming or multitasking. The modern and sleek design makes it a device you will love to show off.',
    price: 499.0,
    originalPrice: 699.0,
    discount: '29%',
    image: '/New_folder/smartphone.webp',
    category: 'electronic',
    rating: 4.8,
    highlights: ['128GB storage', '64MP camera', 'Fast charging', 'Smooth performance', 'Modern design', 'High-quality'],
  },
  // {
  //   id: 101,
  //   name: 'Nike Casual Shoes',
  //   description: 'Step out in style with these trendy Nike sneakers, designed for daily wear. The comfortable cushioned sole provides support and comfort for all-day use. They are perfect for casual outings, pairing effortlessly with jeans, shorts, and more. The durable design ensures they will be a long-lasting addition to your wardrobe. Their timeless appeal makes them a must-have for any sneaker enthusiast.',
  //   price: 59.99,
  //   originalPrice: 90.0,
  //   discount: '33%',
  //   image: '/New_folder/nike_shoes.webp',
  //   category: 'clothing',
  //   rating: 4.6,
  //   highlights: ['Stylish', 'Comfortable', 'Cushioned sole', 'Trendy', 'Durable', 'Casual wear'],
  // },
  {
    id: 102,
    name: 'Denim Jacket',
    description: 'A timeless classic, this denim jacket is a wardrobe staple that works for all seasons. Its versatile design pairs well with almost any outfit, from dresses to t-shirts. The sturdy material ensures durability and a long lifespan. The jacket features a classic fit that never goes out of style. It’s the perfect layering piece for those cooler days or evenings.',
    price: 39.99,
    originalPrice: 59.99,
    discount: '33%',
    image: '/New_folder/denim_jacket.webp',
    category: 'clothing',
    rating: 4.4,
    highlights: ['Classic fit', 'Versatile', 'All seasons', 'Sturdy', 'Timeless', 'Layering'],
  },
  {
    id: 103,
    name: 'Summer T-shirt',
    description: 'Stay cool and comfortable in this lightweight summer t-shirt. Made with soft cotton fabric, it feels gentle against the skin and provides excellent breathability. It’s a great choice for warm weather, keeping you feeling fresh all day. The stylish printed design adds a touch of personality to your look. This is an easy and essential addition to your casual collection.',
    price: 19.99,
    originalPrice: 29.99,
    discount: '33%',
    image: '/New_folder/summer_tshirt.webp',
    category: 'clothing',
    rating: 4.3,
    highlights: ['Soft cotton', 'Lightweight', 'Breathable', 'Printed design', 'Comfortable'],
  },
  {
    id: 104,
    name: "Women's top",
    description: 'This elegant women\'s top is a beautiful piece of ethnic wear, perfect for special occasions. It features vibrant and festive prints that add a pop of color to your wardrobe. The soft and comfortable fabric ensures you can wear it for hours without any discomfort. This top is an ideal choice for celebrating festivals, family gatherings, or any celebratory event. It offers a lovely blend of traditional and modern style.',
    price: 24.5,
    originalPrice: 35.0,
    discount: '30%',
    image: '/New_folder/woman.webp',
    category: 'clothing',
    rating: 4.1,
    highlights: ['Elegant', 'Ethnic wear', 'Festive prints', 'Soft fabric', 'Comfortable', 'Occasion wear'],
  },
  {
    id: 105,
    name: 'Puma Joggers',
    description: 'These athletic joggers are designed for an active lifestyle, offering both style and functionality. They are perfect for a trip to the gym, a morning run, or simply for casual everyday wear. The stretchable and lightweight fabric provides full mobility and comfort. They feature a trendy modern fit that looks great with a variety of tops. These joggers are a versatile piece for any fitness enthusiast.',
    price: 29.99,
    originalPrice: 44.99,
    discount: '33%',
    image: '/New_folder/puma_joggers.webp',
    category: 'clothing',
    rating: 4.7,
    highlights: ['Athletic', 'Gym wear', 'Stretchable', 'Lightweight', 'Trendy fit', 'Versatile'],
  },
  {
    id: 106,
    name: 'Formal Shirt',
    description: 'A classic white formal shirt is a must-have for any professional wardrobe. It is an ideal choice for business meetings, corporate events, and formal occasions. The slim and elegant design gives a sharp and polished look. Made with breathable and crisp fabric, it keeps you comfortable throughout the day. This shirt is a foundational piece that pairs well with trousers and suits.',
    price: 34.99,
    originalPrice:49.99,
    discount: '30%',
    image: '/New_folder/shirt.webp',
    category: 'clothing',
    rating: 4.5,
    highlights: ['Classic', 'Formal', 'Slim fit', 'Breathable', 'Crisp fabric', 'Professional'],
  },
  {
    id: 107,
    name: 'Leather Belt',
    description: 'Complete your formal outfit with this premium leather belt. Made of genuine leather, it is a durable accessory that will last for years. The stylish buckle adds a touch of sophistication to your look. It is the perfect finishing touch for business attire and special events. The adjustable design ensures a comfortable and secure fit.',
    price: 14.99,
    originalPrice: 22.0,
    discount: '32%',
    image: '/New_folder/leather_belt.webp',
    category: 'clothing',
    rating: 4.0,
    highlights: ['Genuine leather', 'Durable', 'Stylish buckle', 'Formal wear', 'Adjustable', 'Accessory'],
  },
  {
    id: 108,
    name: 'Hooded Sweatshirt',
    description: 'Stay warm and stylish with this comfortable hooded sweatshirt. The soft fleece lining provides excellent warmth, making it great for colder seasons. It features a convenient front pocket and an adjustable drawstring hood. This sweatshirt is an excellent piece for layering and adds a trendy urban style to your casual look. It offers a perfect blend of comfort and street style.',
    price: 44.99,
    originalPrice: 65.0,
    discount: '31%',
    image: '/New_folder/hodded_sweatshirt.webp',
    category: 'clothing',
    rating: 4.4,
    highlights: ['Soft fleece', 'Warmth', 'Front pocket', 'Hooded', 'Trendy', 'Winter wear'],
  },
  {
    id: 109,
    name: 'Printed Scarf',
    description: 'Add a touch of flair to your outfit with this lightweight printed scarf. The colorful design can instantly brighten up your look and add a stylish accent. Its versatile nature allows it to be paired with both ethnic and modern outfits. It is made of a light material, making it easy to carry and wear. This scarf is a great way to express your style.',
    price: 9.99,
    originalPrice: 15.0,
    discount: '33%',
    image: '/New_folder/scraf.webp',
    category: 'clothing',
    rating: 3.9,
    highlights: ['Lightweight', 'Colorful design', 'Versatile', 'Accessory', 'Stylish', 'Easy to carry'],
  },
  {
    id: 110,
    name: 'Woolen Cap',
    description: 'This woolen cap is a cozy and practical accessory for the winter months. Made with soft wool fabric, it provides warmth and protection against the cold. The snug and stretchable fit ensures it stays comfortably on your head. It is an essential item for staying warm while still looking stylish. The simple design makes it easy to match with any winter jacket or sweater.',
    price: 7.99,
    originalPrice: 11.99,
    discount: '33%',
    image: '/New_folder/woolen_cap.webp',
    category: 'clothing',
    rating: 4.2,
    highlights: ['Soft wool', 'Keeps warm', 'Snug fit', 'Winter essential', 'Stretchable', 'Comfortable'],
  },
  // {
  //   id: 111,
  //   name: 'Ray-Ban Sunglasses',
  //   description: 'Protect your eyes with these stylish and functional sunglasses from Ray-Ban. They offer UV protection, shielding your eyes from harmful sun rays. The modern frame design provides a fashionable look for any occasion. They are lightweight and comfortable for all-day wear. As a branded original eyewear, you can be sure of their quality and authenticity.',
  //   price: 89.99,
  //   originalPrice: 140.0,
  //   discount: '36%',
  //   image: '/New_folder/sunglasses.webp',
  //   category: 'clothing',
  //   rating: 4.8,
  //   highlights: ['UV protection', 'Stylish frame', 'Lightweight', 'Comfortable', 'Branded', 'Original'],
  // },
  {
    id: 112,
    name: 'Levi’s Jeans',
    description: 'These Levi’s jeans are a classic choice for everyday wear. Made with premium stretchable denim, they provide all-day comfort and flexibility. The timeless 5-pocket style is both functional and fashionable. The long-lasting material ensures they will hold up to frequent washing and wearing. These jeans are a reliable and stylish foundation for countless outfits.',
    price: 54.99,
    originalPrice: 79.99,
    discount: '31%',
    image: '/New_folder/levis_jeans.webp',
    category: 'clothing',
    rating: 4.6,
    highlights: ['Stretchable', 'Premium denim', 'Classic style', 'Durable', 'Comfortable', 'Versatile'],
  },
  {
    id: 201,
    name: 'Ponds Face Wash',
    description: 'Achieve a fresh and radiant complexion with this deep-cleansing face wash. It is designed to remove dirt, oil, and impurities, leaving your skin feeling clean and refreshed. The gentle formula is suitable for daily use and helps in revealing a glowing and healthy look. It is an essential step in any skincare routine, preparing your skin for the next steps.',
    price: 12.99,
    originalPrice: 19.99,
    discount: '35%',
    image: '/images/pond10.webp',
    category: 'facial',
    rating: 4.5,
    highlights: ['Deep cleans', 'Gives glow', 'Removes dirt', 'Gentle on skin', 'Daily use', 'Skincare'],
  },
  {
    id: 202,
    name: 'Ponds age miracle',
    description: 'Exfoliate your skin gently with this natural neem-based scrub. It works effectively to remove dead skin cells and impurities, revealing a smoother and clearer complexion. The neem formula helps in reducing pimples and acne, making it a great choice for troubled skin. It is suitable for daily use and leaves your skin feeling revitalized and soft.',
    price: 6.5,
    originalPrice: 9.99,
    discount: '35%',
    image: '/images/pond6.webp',
    category: 'facial',
    rating: 4.3,
    highlights: ['Removes dead skin', 'Reduces pimples', 'Natural formula', 'Daily use', 'Revitalizes', 'Smooths skin'],
  },
  {
    id: 203,
    name: 'Ponds gel Pack',
    description: 'Restore your skin\'s natural radiance with this traditional ubtan pack. It is designed to effectively remove tan and even out your skin tone. The turmeric-based formula gives your skin a natural, healthy glow. Made with safe, natural ingredients, it is gentle on the skin. Regular use helps in achieving a bright and radiant look, making it a perfect weekly ritual.',
    price: 9.99,
    originalPrice: 14.99,
    discount: '33%',
    image: '/images/pond12.webp',
    category: 'facial',
    rating: 4.4,
    highlights: ['Removes tan', 'Natural glow', 'Turmeric-based', 'Natural ingredients', 'Radiant look', 'Skin brightening'],
  },
  {
    id: 204,
    name: 'Ponds Moisturizer',
    description: 'Keep your skin hydrated and soft with this light and non-sticky moisturizer. It is perfect for hydrating dry skin and can be used daily for the best results. The formula is suitable for all seasons, providing moisture without feeling heavy. It absorbs quickly into the skin, leaving it feeling smooth and supple. This moisturizer is a simple yet effective addition to your skincare routine.',
    price: 7.99,
    originalPrice: 12.50,
    discount: '36%',
    image: '/images/pon5.webp',
    category: 'facial',
    rating: 4.6,
    highlights: ['Hydrates dry skin', 'Non-sticky', 'Daily use', 'All seasons', 'Quick absorption', 'Smooths skin'],
  },
  {
    id: 205,
    name: 'Ponds Night Cream',
    description: 'Let your skin rejuvenate while you sleep with this nourishing night cream. It is formulated to repair skin cells overnight, helping to restore and revitalize your complexion. The cream leaves your skin feeling smooth and soft by morning. It is made with natural herbs, ensuring a gentle and effective treatment. Incorporating this into your nightly routine will help you wake up with healthier-looking skin.',
    price: 11.5,
    originalPrice: 16.99,
    discount: '32%',
    image: '/images/pond7.webp',
    category: 'facial',
    rating: 4.1,
    highlights: ['Nourishes overnight', 'Repairs skin', 'Natural herbs', 'Smooth skin', 'Revitalizing', 'Night routine'],
  },
  {
    id: 206,
    name: 'Ponds light',
    description: 'Give yourself a salon-like facial at home with this complete gold facial kit. It is designed to brighten dull skin and give you a natural, radiant glow. The kit contains gold dust, known for its skin-enhancing properties. The easy-to-follow steps make the at-home facial experience simple and enjoyable. This kit is perfect for special occasions or when your skin needs a boost of rejuvenation.',
    price: 18.0,
    originalPrice: 25.0,
    discount: '28%',
    image: '/images/pond11.webp',
    category: 'facial',
    rating: 4.4,
    highlights: ['Brightens skin', 'Natural glow', 'Gold dust', 'Home use', 'Rejuvenates', 'Special occasions'],
  },
  {
    id: 207,
    name: 'Pond’s BB Cream',
    description: 'This BB cream provides instant coverage for dark spots and blemishes, giving you a smooth complexion. It gives a fair and glowing look while feeling light on the skin. The cream is easy to apply and blends seamlessly with your skin tone. It is perfect for achieving a natural, everyday look. This is a great product for those who want coverage without the heavy feel of foundation.',
    price: 5.99,
    originalPrice: 8.99,
    discount: '33%',
    image: '/New_folder/ponds_cream.webp',
    category: 'facial',
    rating: 4.2,
    highlights: ['Covers dark spots', 'Gives glow', 'Lightweight', 'Easy to apply', 'Blends well', 'Daily use'],
  },
  {
    id: 208,
    name: 'Ponds gel cream',
    description: 'This micellar water is an essential for effortless makeup removal. It gently and effectively removes makeup without requiring any harsh rubbing or rinsing. The formula cleanses deeply, lifting away dirt and oil from your pores. It also soothes the skin, leaving it feeling calm and refreshed after use. This product is a convenient and gentle way to end your day and clean your skin.',
    price: 4.99,
    originalPrice: 7.5,
    discount: '33%',
    image: '/images/pond13.webp',
    category: 'facial',
    rating: 4.7,
    highlights: ['Removes makeup', 'No rinse', 'Deep cleansing', 'Soothes skin', 'Gentle', 'Daily cleanser'],
  },
  {
    id: 302,
    name: 'Puma Joggers light',
    description: 'These light grey joggers are a versatile addition to your casual wardrobe. They feature a sleek, modern fit and convenient side pockets for your essentials. Perfect for running errands or hitting the gym, they provide a great balance of comfort and style. The fabric is soft and breathable, ensuring you stay comfortable throughout your day. These joggers are a must-have for a relaxed and sporty look.',
    price: 30.49,
    originalPrice: 45.0,
    discount: '32%',
    image: '/New_folder/puma_joggers1.jpg',
    category: 'puma',
    rating: 4.5,
    highlights: ['Sleek fit', 'Side pockets', 'Running errands', 'Gym wear', 'Comfortable', 'Sporty'],
  },
  {
    id: 307,
    name: 'Puma ultra Hoodie',
    description: 'Stay cozy and stylish with this full-zip hoodie from Puma. It features front pockets for keeping your hands warm and storing small items. The hoodie is designed for both performance during workouts and casual everyday wear. The comfortable fabric and thoughtful design make it a great layering piece. This is a versatile hoodie that fits perfectly into an active lifestyle.',
    price: 45.0,
    originalPrice: 65.0,
    discount: '31%',
    image: '/New_folder/puma_hoddy3.jpg',
    category: 'puma',
    rating: 4.6,
    highlights: [ "warmth" ,"threading logo", 'Performance', 'Casual wear', 'Comfortable', 'Layering'],
  },
  {
    id: 304,
    name: 'Casual Puma Joggers',
    description: 'These casual joggers are your go-to for maximum comfort. They are made with a soft cotton lining that feels gentle against your skin. Great for lounging at home or creating a comfortable daily outfit, they offer a relaxed fit. The simple and understated design makes them easy to pair with any t-shirt or hoodie. These joggers are all about comfort and effortless style.',
    price: 29.99,
    originalPrice: 40.0,
    discount: '25%',
    image: '/New_folder/puma_joggers3.webp',
    category: 'puma',
    rating: 4.4,
    highlights: ['Soft cotton', 'Casual wear', 'Lounging', 'Relaxed fit', 'Comfortable', 'Daily looks'],
  },
  {
    id: 305,
    name: 'Puma Hoodie',
    description: 'This navy blue hoodie is a classic for a reason, offering timeless style and exceptional comfort. The soft fleece interior provides superior warmth and a cozy feel. It features a relaxed fit and an adjustable drawstring hood, so you can customize your comfort. This hoodie is perfect for layering during cooler weather and is a versatile addition to any casual wardrobe.',
    price: 43.99,
    originalPrice: 60.0,
    discount: '27%',
    image: '/New_folder/puma_hoody1.jpg',
    category: 'puma',
    rating: 4.3,
    highlights: [ 'Soft fleece', 'Relaxed fit', 'Drawstring hood', 'Warmth', 'Versatile'],
  },
  {
    id: 306,
    name: 'Puma Classic Hoodie',
    description: 'A classic pullover hoodie that is perfect for any casual occasion. It features ribbed cuffs and hem, providing a secure and comfortable fit. This hoodie is ideal for layering during the winter or on chilly evenings. The high-quality material ensures it will be a durable and long-lasting part of your wardrobe. Its simple and clean design makes it a reliable choice for everyday comfort.',
    price: 41.5,
    originalPrice: 58.0,
    discount: '28%',
    image: '/New_folder/puma_hoody2.jpg',
    category: 'puma',
    rating: 4.5,
    highlights: ['Classic pullover', 'Ribbed cuffs', 'Layering', 'Winter wear', 'Durable', 'Everyday comfort'],
  },
  {
    id: 301,
    name: 'Puma Joggers',
    description: 'These stylish black joggers are engineered for comfort and everyday wear. Made from a stretchable and breathable fabric, they ensure all-day comfort and mobility. The sleek design makes them perfect for a variety of casual settings. Whether you are running errands or relaxing at home, these joggers provide a modern and comfortable fit. They are a must-have for a contemporary, active lifestyle.',
    price: 32.99,
    originalPrice: 50.0,
    discount: '34%',
    image: '/New_folder/puma_joggers.webp',
    category: 'puma',
    rating: 4.6,
    highlights: ['Stylish', 'Everyday comfort', 'Stretchable', 'Breathable', 'Modern fit', 'Versatile'],
  },
  {
    id: 303,
    name: 'Puma Track Joggers',
    description: 'These athletic joggers are perfect for workouts and active days outdoors. They are made with moisture-wicking material that keeps you dry and comfortable during exercise. The design is optimized for performance, offering a full range of motion. These joggers are a great choice for hitting the track or enjoying a hike. They are an essential piece for any serious athlete.',
    price: 33.99,
    originalPrice: 48.0,
    discount: '29%',
    image: '/New_folder/puma_joggers2.webp',
    category: 'puma',
    rating: 4.7,
    highlights: ['Athletic', 'Moisture-wicking', 'Workouts', 'Active days', 'Comfortable', 'Performance'],
  },
  {
    id: 308,
    name: 'Lightweight Puma Hoodie',
    description: 'This lightweight hoodie is perfect for transitional weather when you need a little extra warmth without the bulk. It provides an excellent blend of comfort and mobility, making it suitable for daily use. The soft material feels great against the skin, and the relaxed fit allows for easy movement. This is a versatile layering piece for anyone who values both style and comfort.',
    price: 39.99,
    originalPrice: 55.0,
    discount: '27%',
    image: '/New_folder/puma_hoddy4.jpg',
    category: 'puma',
    rating: 4.4,
    highlights: ['Lightweight', 'Transitional weather', 'Mobility', 'Daily use', 'Comfortable', 'Versatile'],
  },
  {
    id: 401,
    name: 'Tommy T-Shirt White',
    description: 'A timeless classic, this white t-shirt features the signature Tommy logo on the chest. Made from soft cotton fabric, it is an ideal choice for summer, providing superior comfort and breathability. The simple yet stylish design makes it a versatile piece that can be dressed up or down. This t-shirt is a fundamental building block for any casual wardrobe.',
    price: 25.99,
    originalPrice: 35,
    discount: '26%',
    image: '/New_folder/tommy.jpeg',
    category: 'tommy',
    rating: 4.5,
    highlights: ['Classic', 'Soft cotton', 'Summer comfort', 'Signature logo', 'Versatile', 'Breathable'],
  },
  {
    id: 402,
    name: 'Tommy Graphic Tee',
    description: 'Express your style with this trendy graphic print tee. It features a unique design that adds a modern flair to your casual look. The shirt is made with a breathable fabric and has a relaxed fit, ensuring maximum comfort throughout the day. It is a great choice for a casual outing with friends or a laid-back day. This tee is a statement piece for your wardrobe.',
    price: 27.49,
    originalPrice: 40.0,
    discount: '31%',
    image: '/New_folder/tommy2.jpeg',
    category: 'tommy',
    rating: 4.3,
    highlights: ['Trendy', 'Graphic print', 'Breathable', 'Relaxed fit', 'Casual style', 'Comfortable'],
  },
  {
    id: 405,
    name: 'Tommy Track Pants',
    description: 'These comfortable track pants are perfect for an active lifestyle and relaxed days. They feature an elastic waistband for a secure and comfortable fit. They are ideal for gym sessions, sports activities, or simply lounging at home. The soft fabric provides a cozy feel. These track pants are a versatile piece that balances functionality and casual style effortlessly.',
    price: 35.99,
    originalPrice: 50.0,
    discount: '28%',
    image: '/New_folder/tommy_lower.webp',
    category: 'tommy',
    rating: 4.4,
    highlights: ['Comfortable', 'Elastic waistband', 'Gym wear', 'Lounging', 'Versatile', 'Activewear'],
  },
  {
    id: 406,
    name: 'Tommy Lounge Lowers',
    description: 'Perfect for relaxed days, these lounge lowers are made from soft cotton, providing ultimate comfort. They have a simple design with subtle branding, making them easy to wear at home or for a quick trip outside. The fabric is gentle on the skin, and the fit is designed for maximum relaxation. These lowers are a must-have for unwinding after a long day.',
    price: 34.49,
    originalPrice: 45.0,
    discount: '23%',
    image: '/New_folder/tommy_lower2.webp',
    category: 'tommy',
    rating: 4.2,
    highlights: ['Soft cotton', 'Lounging', 'Relaxed fit', 'Simple design', 'Comfortable', 'Daily wear'],
  },
  {
    id: 407,
    name: 'Tommy Athletic Joggers',
    description: 'These athletic joggers are designed with performance in mind. They feature a tapered fit that provides a streamlined silhouette and does not get in the way during workouts. The quick-dry fabric is ideal for training sessions, wicking away moisture to keep you comfortable. These joggers are a stylish and functional choice for any serious athlete. They offer both performance and modern style.',
    price: 36.75,
    originalPrice: 52.0,
    discount: '29%',
    image: '/New_folder/tommy_lower4.webp',
    category: 'tommy',
    rating: 4.6,
    highlights: ['Athletic fit', 'Tapered legs', 'Quick-dry fabric', 'Training sessions', 'Functional', 'Performance'],
  },
  {
    id: 408,
    name: 'Tommy Cuffed Pants',
    description: 'These stylish cuffed joggers are a perfect blend of modern design and comfort. They feature side stripes that add a sporty and trendy touch. The joggers are suitable for both the gym and street style, making them incredibly versatile. The cuffed ankles provide a clean and polished look. These pants are a great way to elevate your casual and athletic outfits.',
    price: 38.25,
    originalPrice: 55.0,
    discount: '30%',
    image: '/New_folder/tommy_lower3.webp',
    category: 'tommy',
    rating: 4.5,
    highlights: ['Stylish', 'Cuffed joggers', 'Side stripes', 'Street style', 'Modern design', 'Versatile'],
  },
  {
    id: 403,
    name: 'Tommy Striped T-Shirt',
    description: 'Add a classic touch to your wardrobe with this striped cotton tee. The round neck design and timeless pattern make it a versatile piece for a variety of outfits. It pairs exceptionally well with denim jeans and casual joggers. The soft cotton fabric ensures all-day comfort and breathability. This tee is a reliable choice for a stylish yet effortless look.',
    price: 28.99,
    originalPrice: 38.0,
    discount: '24%',
    image: '/New_folder/tommy3.jpeg',
    category: 'tommy',
    rating: 4.4,
    highlights: ['Striped pattern', 'Round neck', 'Soft cotton', 'Versatile', 'Comfortable', 'Everyday wear'],
  },
  {
    id: 404,
    name: 'Tommy Slim Fit Tee',
    description: 'Designed for a sharp and modern silhouette, this slim-fit t-shirt is made from stretchable cotton jersey. The fabric provides a comfortable and body-hugging fit without restricting movement. It is an excellent choice for a polished and clean look. This tee is a great foundation for layering or wearing on its own. It is an essential for any man who appreciates a tailored fit.',
    price: 26.5,
    originalPrice: 35.0,
    discount: '24%',
    image: '/New_folder/tommy4.jpeg',
    category: 'tommy',
    rating: 4.3,
    highlights: ['Slim fit', 'Sharp silhouette', 'Stretchable cotton', 'Polished look', 'Modern', 'Tailored'],
  },
  {
    id: 501,
    name: 'US Polo Leather Belt',
    description: 'This classic brown leather belt is a timeless accessory for any wardrobe. It features a polished buckle that adds a sophisticated touch. The genuine leather material ensures durability and a premium feel. It is perfect for completing both formal and semi-formal attire, adding a refined look to your trousers. This belt is an essential for any man who values quality and style.',
    price: 21.99,
    originalPrice: 30.0,
    discount: '27%',
    image: '/New_folder/belt.webp',
    category: 'polo',
    rating: 4.5,
    highlights: ['Classic', 'Genuine leather', 'Polished buckle', 'Formal attire', 'Durable', 'Accessory'],
  },
  {
    id: 502,
    name: 'US Polo Brown Belt',
    description: 'A sleek black belt that is a versatile staple for daily use. It features embossed US Polo branding, giving it a subtle and stylish detail. The durable construction ensures it can withstand regular wear and tear. This belt is perfect for complementing a wide range of outfits, from jeans to business casual. It offers a clean and modern look.',
    price: 23.5,
    originalPrice: 32.0,
    discount: '26%',
    image: '/New_folder/belt2.webp',
    category: 'polo',
    rating: 4.4,
    highlights: ['Sleek brown', 'Embossed branding', 'Durable', 'Daily use', 'Versatile', 'Stylish'],
  },
  {
    id: 505,
    name: 'US Polo Classic Cap',
    description: 'Shield yourself from the sun with this timeless cotton cap. It features the iconic US Polo logo on the front, adding a touch of classic style. The adjustable strap ensures you can achieve the perfect fit for maximum comfort. It is a great accessory for a casual day out or for adding a sporty element to your look. This cap is a versatile piece for all seasons.',
    price: 15.99,
    originalPrice: 22.0,
    discount: '27%',
    image: '/New_folder/cap4.webp',
    category: 'polo',
    rating: 4.3,
    highlights: ['Timeless', 'Cotton fabric', 'Iconic logo', 'Adjustable strap', 'Casual', 'Sporty'],
  },
  {
    id: 506,
    name: 'US Polo Cap',
    description: 'This navy blue cap is perfect for sunny days and complements any sporty outfit. It features a curved brim that provides excellent sun protection. Made from a durable and comfortable material, it is ideal for all-day wear. The classic design makes it a versatile accessory that you will reach for again and again. It is a great way to top off your casual look.',
    price: 16.49,
    originalPrice: 24.0,
    discount: '31%',
    image: '/New_folder/cap.webp',
    category: 'polo',
    rating: 4.2,
    highlights: ['Navy blue', 'Curved brim', 'Sun protection', 'Sporty looks', 'Durable', 'Casual'],
  },
  {
    id: 507,
    name: 'US Polo Sports Cap',
    description: 'Designed for an active lifestyle, this sports cap is made with breathable mesh material. It is lightweight and features sweat-resistant technology to keep you comfortable during workouts. This cap is an essential for running, hiking, or any outdoor activity. The functional design ensures it stays in place while you move. It is a perfect blend of performance and style.',
    price: 17.25,
    originalPrice: 25.0,
    discount: '31%',
    image: '/New_folder/cap2.webp',
    category: 'polo',
    rating: 4.7,
    highlights: ['Breathable mesh', 'Active lifestyle', 'Lightweight', 'Sweat-resistant', 'Workouts', 'Functional'],
  },
  {
    id: 508,
    name: 'US Polo Cap',
    description: 'A fashionable accessory that features a detailed embroidery of the branded logo. This cap is a great way to add a stylish touch to your casual outfits. The adjustable design ensures a comfortable and secure fit for all-day wear. The high-quality materials and craftsmanship make it a long-lasting addition to your collection. It is the perfect blend of style and practicality.',
    price: 18.5,
    originalPrice: 28.0,
    discount: '34%',
    image: '/New_folder/cap3.webp',
    category: 'polo',
    rating: 4.5,
    highlights: ['Detailed embroidery', 'Branded logo', 'Fashionable', 'Adjustable', 'Stylish', 'Accessory'],
  },
  {
    id: 503,
    name: 'US Polo Textured Belt',
    description: 'This elegant belt features a textured finish that adds a unique touch to your wardrobe. The metal pin buckle is both stylish and functional. It is perfect for adding a layer of sophistication to your formal or business casual looks. The durable construction ensures it will be a long-lasting accessory. This belt is a great way to elevate your style with a subtle detail.',
    price: 24.75,
    originalPrice: 35.0,
    discount: '29%',
    image: '/New_folder/belt3.webp',
    category: 'polo',
    rating: 4.6,
    highlights: ['Textured finish', 'Metal buckle', 'Sophisticated', 'Durable', 'Elegant', 'Formal wear'],
  },
  {
    id: 504,
    name: 'US Polo Reversible Belt',
    description: 'Get two looks in one with this versatile reversible belt. It offers a black side and a brown side, allowing you to easily match it with any outfit. This feature makes it great for travel, as you only need to pack one belt. The high-quality material ensures durability and a stylish look. This belt is a practical and fashionable accessory for any man.',
    price: 26.99,
    originalPrice: 38.0,
    discount: '29%',
    image: '/New_folder/belt4.webp',
    category: 'polo',
    rating: 4.8,
    highlights: ['Reversible', '2-in-1', 'Versatile', 'Travel-friendly', 'Durable', 'Fashionable'],
  },
  {
    id: 701,
    name: 'Nike Men Gym Suit',
    description: 'This breathable gym suit is equipped with dry-fit technology to keep you cool and comfortable during your workouts. It is ideal for intense training sessions and daily exercise routines. The suit provides a flexible and unrestricted fit, allowing for a full range of motion. It is a perfect choice for serious athletes and fitness enthusiasts. This suit helps you perform at your best.',
    price: 59.99,
    originalPrice: 79.99,
    discount: '25%',
    image: '/New_folder/nike1.webp',
    category: 'gymsuit',
    rating: 4.7,
    highlights: ['Breathable', 'Dry-fit technology', 'Intense training', 'Flexible fit', 'Gym wear', 'Comfortable'],
  },
  {
    id: 702,
    name: 'Nike Men Training Set',
    description: 'This training set includes a slim-fit tee and shorts, offering a complete athletic look. The flexible and sweat-resistant fabric ensures comfort and mobility during any physical activity. It is designed to provide a full range of motion, so you can move freely. This set is a great choice for both casual workouts and more serious training. It combines style and performance seamlessly.',
    price: 54.5,
    originalPrice: 70.0,
    discount: '22%',
    image: '/New_folder/nike2.webp',
    category: 'gymsuit',
    rating: 4.6,
    highlights: ['Slim-fit', 'Sweat-resistant', 'Training', 'Flexible fabric', 'Full range motion', 'Stylish'],
  },
  {
    id: 705,
    name: 'Nike Women Gym Suit',
    description: 'Stay stylish and comfortable during your workouts with this gym suit designed for active women. It features a comfortable fit and quick-dry technology, keeping you cool and dry. The suit is perfect for a variety of exercises, from cardio to weightlifting. It is a functional and fashionable choice for any fitness journey. This suit helps you feel confident and ready to train.',
    price: 58.9,
    originalPrice: 75.0,
    discount: '21%',
    image: '/New_folder/nike8.webp',
    category: 'gymsuit',
    rating: 4.5,
    highlights: ['Stylish', 'Quick-dry', 'Comfortable fit', 'Active women', 'Functional', 'Gym wear'],
  },
  {
    id: 706,
    name: 'Nike Women Workout Set',
    description: 'This workout set includes high-waist leggings and a supportive sports bra, providing a complete and functional outfit. It is designed for optimal performance during yoga, running, or gym sessions. The supportive fit ensures you feel secure and comfortable during your movements. The high-quality fabric is durable and flexible. This set is a perfect blend of fashion and fitness.',
    price: 61.0,
    originalPrice: 80.0,
    discount: '24%',
    image: '/New_folder/nike7.webp',
    category: 'gymsuit',
    rating: 4.7,
    highlights: ['High-waist leggings', 'Supportive sports bra', 'Yoga/running', 'Optimal performance', 'Durable', 'Workout'],
  },
  {
    id: 707,
    name: 'Nike Flex Women Set',
    description: 'Experience ultimate comfort and mobility with this lightweight and stretchable gym suit. The fabric is designed to give you a full range of motion, making it perfect for dynamic workouts. It is sweat-free and provides exceptional comfort during intense sessions. This set is a great choice for those who value flexibility and unrestricted movement. It is a functional and comfortable piece for your active wardrobe.',
    price: 56.49,
    originalPrice: 72.0,
    discount: '21%',
    image: '/New_folder/nike6.webp',
    category: 'gymsuit',
    rating: 4.6,
    highlights: ['Lightweight', 'Stretchable', 'Full mobility', 'Sweat-free', 'Comfortable', 'Workouts'],
  },
  {
    id: 708,
    name: 'Nike Women Gym Tracksuit',
    description: 'This modern tracksuit is perfect for high-intensity training sessions. The stylish and functional design ensures you look good while you work out. It is made with a breathable fabric that keeps you cool and dry. The tracksuit is a versatile piece that can be worn to the gym or for a casual outing. It combines fashion and functionality seamlessly.',
    price: 60.0,
    originalPrice: 78.0,
    discount: '23%',
    image: '/New_folder/nike5.webp',
    category: 'gymsuit',
    rating: 4.5,
    highlights: ['Modern tracksuit', 'High-intensity', 'Breathable fabric', 'Functional', 'Stylish', 'Versatile'],
  },
  {
    id: 703,
    name: 'Nike Pro Men Set',
    description: 'This compression-fit set is engineered to support muscle recovery and provide optimal ventilation. It includes a top and bottom that hug your body for a secure feel. The design helps in reducing muscle vibration and fatigue, allowing you to train harder for longer. It is perfect for high-performance athletes who need that extra edge. This set is a game-changer for serious training.',
    price: 62.0,
    originalPrice: 85.0,
    discount: '27%',
    image: '/New_folder/nike3.webp',
    category: 'gymsuit',
    rating: 4.8,
    highlights: ['Compression-fit', 'Muscle recovery', 'Optimal ventilation', 'High-performance', 'Supportive', 'Training'],
  },
  {
    id: 704,
    name: 'Nike Men Activewear Combo',
    description: 'This gym suit is made from soft, stretchable fabric, providing ultimate comfort during your active moments. It is designed for high performance, ensuring you can move freely without any restrictions. The combo is perfect for a variety of sports and workouts. The durable material ensures it will hold up to frequent use and washing. It is an essential for any man who prioritizes comfort and quality in their activewear.',
    price: 57.25,
    originalPrice: 75.0,
    discount: '24%',
    image: '/New_folder/nike4.webp',
    category: 'gymsuit',
    rating: 4.6,
    highlights: ['Soft fabric', 'Stretchable', 'High performance', 'Durable', 'Comfortable', 'Activewear'],
  },
  { id: 801, name: 'Haute Sauce pink hand Bag', description: 'Elegant brown leather bag with fine stitching.\nPerfect for both work and travel.', price: 79.99, originalPrice: 99.99, discount: 20, image: '/New_folder/bag18.webp', category: 'haute sauce', type: 'hand bag', rating: 4.5 },
  { id: 802, name: 'Caprese Shoulder Bag', description: 'Premium black leather bag with laptop compartment.\nSleek design for professionals.', price: 89.50, originalPrice: 115.00, discount: 22, image: '/New_folder/bag12.webp', category: 'caprese', type: 'hand bag', rating: 4.6 },
  { id: 803, name: 'Caprese Shoulder Bag', description: 'Textured leather with metallic accents.\nIdeal for formal or semi-formal wear.', price: 92.28, originalPrice: 120.00, discount: 23, image: '/New_folder/bag13.webp', category: 'caprese', type: 'shoulder bag', rating: 4.4 },
  { id: 804, name: 'Haute Sauce shoulder Bag', description: 'Stylish reversible leather tote.\nUse either black or brown side to match your outfit.', price: 94.78, originalPrice: 118.48, discount: 20, image: '/New_folder/bag14.webp', category: 'haute sauce', type: 'hand bag', rating: 4.7 },
  { id: 805, name: 'Haute Sauce shoulder Bag', description: 'Compact leather messenger with flap closure.\nPerfect for casual urban style.', price: 72.99, originalPrice: 95.00, discount: 23, image: '/New_folder/bag15.webp', category: 'haute sauce', type: 'hand bag', rating: 4.3 },
  { id: 806, name: 'Caprese hand Bag', description: 'Lightweight crossbody with adjustable strap.\nGreat for daily errands and travel.', price: 68.49, originalPrice: 85.61, discount: 20, image: '/New_folder/bag16.webp', category: 'caprese', type: 'shoulder bag', rating: 4.5 },
  { id: 807, name: 'Haute Sauce tot hand Bag', description: 'Spacious duffel bag made of pure leather.\nPerfect companion for weekend trips.', price: 104.28, originalPrice: 140.92, discount: 26, image: '/New_folder/bag17.webp', category: 'haute sauce', type: 'hand bag', rating: 4.8 },
  { id: 810, name: 'caprese  urban hand bag', description: 'Modern and versatile backpack designed for digital nomads. It features padded compartments for laptops and gadgets, water-resistant material, and multiple pockets for organization. Ideal for daily commuting and short business trips.', price: 89.99, originalPrice: 119.99, discount: '25%', image: '/images/bag21.webp', category: 'caprese', type: 'hand bag', rating: 4.6, highlights: ['makeup compartment', 'Water-resistant', 'Multi-pocket', 'Compact', 'Versatile',] },
  { id: 811, name: 'caprese Canvas hand bag', description: 'Rugged and stylish duffel bag made with waxed canvas and leather accents. Perfect for road trips and gym sessions. The bag is lightweight yet sturdy, with a timeless aesthetic.', price: 74.50, originalPrice: 99.00, discount: '25%', image: '/images/bag22.webp', category: 'caprese', type: 'hand bag', rating: 4.4, highlights: ['Waxed canvas', 'Leather accents', 'Lightweight', 'Timeless design', 'Road trip ready'] },
  { id: 812, name: ' Caprese Leather hand bag', description: 'Elegant leather briefcase tailored for professionals. Features a padded laptop sleeve, interior organizer, and high-quality metal zippers. Perfect for office, meetings, or formal events.', price: 139.00, originalPrice: 185.00, discount: '25%', image: '/images/bag23.webp', category: 'caprese', type: 'hand bag', rating: 4.9, highlights: ['Professional look', 'side sleeve', 'Premium zippers', 'Organizer', 'Formal use'] },
  { id: 813, name: 'Caprese Sling Shoulder Bag', description: 'Minimalist crossbody bag ideal for quick errands and travel. It features an adjustable strap, anti-theft pockets, and durable zippers. Compact and lightweight, yet spacious enough for essentials.', price: 34.95, originalPrice: 49.99, discount: '30%', image: '/images/bag24.webp', category: 'caprese', type: 'shoulder bag', rating: 4.5, highlights: ["water resistant", 'Lightweight', 'Travel-friendly', 'Durable', 'Minimalist'] },
  { id: 814, name: 'Haute sauce shoulder bag', description: 'Designed for outdoor events, this premium bag is made from recycled materials. It includes a hydration pack compartment, rain cover, and extra back padding for comfort during long treks.', price: 97.80, originalPrice: 139.99, discount: '30%', image: '/images/bag25.webp', category: 'haute sauce', type: 'hand bag', rating: 4.7, highlights: ["premium quality", "durable ",'Hydration compatible', 'Rain cover', 'Padded back', 'Outdoor use'] },
  { id: 815, name: 'Haute Sauce hand bag', description: 'Lightweight and sleek carry-on hand . Ideal for frequent flyers who prioritize mobility and efficiency. Its hard shell protects contents without adding bulk.', price: 129.99, originalPrice: 174.99, discount: '26%', image: '/images/bag26.webp', category: 'haute sauce', type: 'hand bag', rating: 4.8, highlights: ['black ', 'golden strip', 'Hard shell', 'Travel-ready', 'Compact'] },
  { id: 816, name: 'Haute sauce hand Bag', description: 'A versatile everyday tote made from canvas and vegan leather. It’s roomy enough for books, gadgets, and essentials. Great for work, school, or a day out.', price: 45.00, originalPrice: 60.00, discount: '25%', image: '/images/bag27.webp', category: 'haute sauce', type: 'hand bag', rating: 4.3, highlights: ['Everyday use', 'Vegan leather', 'Spacious', 'Trendy', 'Light carry'] },
  { id: 817, name: 'haute Sauce shoulder bag', description: 'Stylish and durable pink bag that offers stylish look, and a golden strip . Ideal for athletes or fitness enthusiasts.', price: 59.90, originalPrice: 79.90, discount: '25%', image: '/images/bag28.webp', category: 'haute sauce', type: 'shoulder bag', rating: 4.6, highlights: ['Wet/dry separation', 'pink', 'golden strip', 'Athlete-friendly', 'Durable'] },
  { id: 808, name: 'caprese Shoulder Leather Bag', description: 'High-end leather bag with embossed logo.\nBlends style with utility for any occasion.', price: 112.50, originalPrice: 150.00, discount: 25, image: '/New_folder/bag11.webp', category: 'caprese', type: 'hand bag', rating: 4.7 },
  {
    id: 900,
    name: 'Boat Stone 1200',
    description: 'Powerful 14W speaker with RGB lights, dual EQ modes, and a 9-hour battery backup. IPX7 waterproof design.',
    price: 79.99,
    originalPrice: 120.0,
    discount: '33%',
    image: '/New_folder/boat_speaker2.png',
    category: 'electronics',
    rating: 4.6,
    highlights: ['14W speaker', 'RGB lights', 'Dual EQ modes', '9-hour battery', 'IPX7 waterproof', 'Party-ready'],
  },
  {
    id: 901,
    name: 'Boat Stone 650',
    description: 'Rugged Bluetooth speaker with immersive stereo sound, 1800mAh battery, and water resistance.',
    price: 69.99,
    originalPrice: 105.0,
    discount: '33%',
    image: '/New_folder/boat_speaker3.png',
    category: 'electronics',
    rating: 4.4,
    highlights: ['Rugged', 'Stereo sound', '1800mAh battery', 'Water-resistant', 'Durable', 'Portable'],
  },
  {
    id: 902,
    name: 'Boat Stone Grenade',
    description: 'Compact grenade-shaped speaker with punchy bass, 7 hours playtime, and shockproof build.',
    price: 49.99,
    originalPrice: 75.0,
    discount: '33%',
    image: '/New_folder/boat3.png',
    category: 'electronics',
    rating: 4.2,
    highlights: ['Compact', 'Punchy bass', '7 hours playtime', 'Shockproof', 'Travel-friendly', 'Portable'],
  },
  {
    id: 903,
    name: 'Boat Stone 350',
    description: 'Wireless portable speaker with Type-C charging, 10W RMS sound, and IPX7 waterproof rating.',
    price: 59.99,
    originalPrice: 90.0,
    discount: '33%',
    image: '/New_folder/boat_speaker4.jpg',
    category: 'electronics',
    rating: 4.5,
    highlights: ['Wireless', '10W RMS sound', 'Type-C charging', 'IPX7 waterproof', 'Portable', 'Convenient'],
  },
  {
    id: 904,
    name: 'AirPods Pro Gen 2',
    description: 'Advanced noise cancellation, adaptive transparency, and up to 6 hours of listening time.',
    price: 129.99,
    originalPrice: 195.0,
    discount: '33%',
    image: '/New_folder/boat10.jpg',
    category: 'electronics',
    rating: 4.8,
    highlights: ['Noise cancellation', 'Adaptive transparency', '6 hours playtime', 'Seamless integration', 'Wireless', 'Premium audio'],
  },
  {
    id: 905,
    name: 'headphone 3rd Gen',
    description: 'Spatial audio with dynamic head tracking, sweat & water resistance, and MagSafe charging case.',
    price: 119.99,
    originalPrice: 180.0,
    discount: '33%',
    image: '/New_folder/boat5.png',
    category: 'electronics',
    rating: 4.7,
    highlights: ['Spatial audio', 'Head tracking', 'Sweat-resistant', 'MagSafe charging', 'Comfortable', 'Immersive'],
  },
  {
    id: 906,
    name: 'AirPods Lite',
    description: 'Entry-level AirPods with 24-hour battery support and seamless Apple ecosystem integration.',
    price: 99.99,
    originalPrice: 150.0,
    discount: '33%',
    image: '/New_folder/boat2.jpg',
    category: 'electronics',
    rating: 4.3,
    highlights: ['Entry-level', '24-hour battery', 'Seamless integration', 'Easy to use', 'Clear audio', 'Daily use'],
  },
  {
    id: 907,
    name: 'AirPods Studio Buds',
    description: 'Compact earbuds with strong bass, noise isolation, and Siri support. Designed for music on-the-go.',
    price: 109.99,
    originalPrice: 165.0,
    discount: '33%',
    image: '/New_folder/boat11.png',
    category: 'electronics',
    rating: 4.6,
    highlights: ['Compact', 'Strong bass', 'Noise isolation', 'Siri support', 'Ergonomic design', 'Music on-the-go'],
  }
];

const getAdjustedPrices = (basePrice, baseOriginalPrice, size) => {
  let price = basePrice;
  let originalPrice = baseOriginalPrice;

 
  if (size === 'L') {
    price = basePrice * 1.10;
    originalPrice = baseOriginalPrice * 1.10;
  }
   else if(size==="S"){
    price=basePrice/1.10;
    originalPrice=baseOriginalPrice/1.10;
  }
  
  else if (size === 'XL') {
      price = basePrice * 1.15; 
      originalPrice = baseOriginalPrice * 1.15;
  }

  return { price, originalPrice };
};

export default function ProductPage({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL'];
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);


  const { price, originalPrice } = product ? getAdjustedPrices(product.price, product.originalPrice, selectedSize) : { price: 0, originalPrice: 0 };


  const addToCart = (item) => {
     toast.success("item added to cart")
   
    const itemWithDetails = { ...item, size: selectedSize, price, originalPrice };
    const updated = [...cartItems, itemWithDetails];
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems(updated);
  };

  const handleBuyNow = (item) => {
    if (!session) {
      alert("Login required");
      router.push("/login");
    } else {
    
      const itemWithDetails = { ...item, size: selectedSize, price, originalPrice };
      localStorage.setItem("cart", JSON.stringify([itemWithDetails]));
      router.push("/checkout");
    }
  };

  if (!product) {
    return (
      <div className="text-red-500 text-center mt-10">Product not found</div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div
      className="min-h-screen pt-20 px-6 bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/New_folder/bag1_bg.avif')" }}
    >
      <div className=" w-[69vw] mx-auto flex flex-col md:flex-row gap-10 bg-white/20 backdrop-blur-2xl border-1 p-6 rounded-lg shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-[300px] h-[450px] object-contain rounded-lg bg-white p-2"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2 whitespace-pre-line">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-green-700 font-bold text-2xl">
              ${price.toFixed(2)}
            </span>
            <span className="text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-red-500 font-bold">
              ({product.discount} OFF)
            </span>
            <div className="flex items-center text-yellow-400">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
              <span className="text-black m-1">({ product.rating})</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Highlights</h4>
            <ul className="list-disc list-inside text-gray-600">
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center gap-4 ">


            {(product.category === "clothing" || product.category === "puma" || product.category === "tommy" || product.category === "gymsuit") && (
              <div className="mt-3 text-center">
                <div className="flex justify-center gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`h-12 w-12 border-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-[#1e263b] text-white border-[#1e263b]'
                          : 'bg-white text-[#1e263b] border-gray-300 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-5 p-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition disabled:bg-gray-400"
              >
                Add to Cart 🛒
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition disabled:bg-orange-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl m-5 font-semibold mt-10 mb-4 text-center text-gray-700">
        You may also like
      </h3>
      <div className="flex  flex-wrap justify-center gap-6">
        {related.map((item) => (
          <div
            key={item.id}
            className="bg-white w-[250px] p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/product/${item.id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-[180px] w-full object-contain rounded-md mb-3 bg-gray-50 p-2"
            />
            <h4 className="font-semibold text-gray-800">{item.name}</h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {item.description}
            </p>
            <div className="text-green-600 font-bold mt-2">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div
        className="fixed bottom-6 right-6 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-orange-600"
        onClick={() => router.push("/cart")}
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </div>
    </div>
  );
}