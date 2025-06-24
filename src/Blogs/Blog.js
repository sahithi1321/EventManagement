import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Blog.css"; // Import CSS for styling

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "How to Plan a Perfect Event",
    summary: "Organizing an event requires careful planning, budgeting, and execution...",
    content: `Planning an event perfectly requires a structured approach that ensures all aspects are well-organized and executed smoothly. The first step is to define the event's purpose and objectives. Whether it is a corporate seminar, a wedding, or a casual gathering, having a clear goal helps in making important decisions. Next, setting a realistic budget is crucial. It determines the scale of the event, from venue selection to catering and entertainment. A well-planned budget prevents overspending and ensures every aspect of the event is adequately covered.

Once the budget is set, selecting the right venue is essential. The venue should align with the event’s theme, be easily accessible, and accommodate the expected number of guests comfortably. After finalizing the location, creating a detailed timeline is necessary. This includes booking vendors, sending invitations, arranging logistics, and scheduling activities. A well-structured timeline ensures that all tasks are completed on time, reducing last-minute stress.

Promotion and guest management play a key role in an event’s success. If it is a public event, using social media, email marketing, or advertisements helps in reaching a larger audience. For private gatherings, sending personalized invitations and confirming attendance is important. Additionally, organizing entertainment, speakers, or activities in advance keeps attendees engaged and enhances their experience.

On the event day, ensuring everything runs smoothly requires proper coordination. Assigning roles to a team, having a checklist, and being prepared for unexpected challenges can help manage the event efficiently. Finally, post-event follow-up is equally important. Gathering feedback from attendees, sending thank-you notes, and reviewing the event’s success help in improving future events. By following these steps, anyone can plan and execute a perfect event with minimal hassle.`,
    image: "https://i.pinimg.com/736x/99/be/a3/99bea312fc16b50d70319901984bd1db.jpg",
  },
  {
    id: 2,
    title: "Top 5 Wedding Venues",
    summary: "Looking for the best places to host your wedding? Here are some beautiful destinations...",
    content: "Choosing the perfect wedding venue is key:",
    image: "https://i.pinimg.com/736x/e0/a0/99/e0a0995770731e4954c857c4824c12fc.jpg",
    venueList: [
      {
        name: "Beachside Resorts",
        description: "Perfect for romantic sunset weddings.",
        image: "https://i.pinimg.com/736x/29/e8/13/29e813ee4f3361ab7c5888edbc896a17.jpg",
      },
      {
        name: "Historic Castles",
        description: "For a fairytale wedding vibe.",
        image: "https://i.pinimg.com/736x/cb/da/7c/cbda7caba6f5aceece787c833453eab8.jpg",
      },
      {
        name: "Luxury Hotels",
        description: "Provide all-in-one wedding packages.",
        image: "https://i.pinimg.com/736x/8c/01/90/8c0190b859dc7f5468b7c7e68db0af0a.jpg",
      },
      {
        name: "Garden Venues",
        description: "Offer a beautiful, natural setting.",
        image: "https://i.pinimg.com/736x/9b/cf/d4/9bcfd44bc053d6531989ce953c54de3f.jpg",
      },
      {
        name: "Destination Weddings",
        description: "Unique and memorable locations.",
        image: "https://i.pinimg.com/736x/19/e8/1c/19e81cf3e65f0897264ff67fce23f321.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "10 Creative Birthday Party Themes",
    summary: "Make your birthday parties extra special with these creative themes...",
    content: "Choosing a birthday party theme sets the tone for the entire celebration. Here are some fun and unique birthday themes to try...",
    image: "https://i.pinimg.com/736x/6c/40/fe/6c40fe163e6e702bbd491475c1f6b866.jpg",
    imageGallery: [
      {
        name: "SUPERHERO PARTY",
        description: "Kids love dressing up as their favorite superheroes!",
        image: "https://i.pinimg.com/736x/9a/9f/ef/9a9fef523b02246330f32f5cf5c23cd8.jpg",
      },
      {
        name: "UNICORN WONDERLAND",
        description: "A dreamy theme filled with rainbows and glitter.",
        image: "https://i.pinimg.com/736x/ca/d1/a0/cad1a0fc54a08ff9096df507aea3fe97.jpg",
      },
      {
        name: "DINOSAUR ADVENTURE",
        description: "A prehistoric adventure for little explorers.",
        image: "https://i.pinimg.com/736x/24/bf/2e/24bf2e9a085f8ae4ca778946bd6048b4.jpg",
      },
      {
        name: "PIRATE TREASURE HUNT",
        description: "Set sail on a thrilling treasure hunt!",
        image: "https://i.pinimg.com/736x/37/b5/5b/37b55b2c02a4085531bb9c14a898e952.jpg",
      },
      {
        name: "PRINCESS ROYAL BALL",
        description: "A fairy-tale celebration fit for a princess.",
        image: "https://i.pinimg.com/736x/77/2e/9a/772e9aa45ba55967991af199c0bd14fa.jpg",
      },
      {
        name: "SPACE GALAXY PARTY",
        description: "Explore the universe with an outer space theme.",
        image: "https://i.pinimg.com/736x/cd/43/a2/cd43a26e9973991683e08c2f2c39e55b.jpg",
      },
      {
        name: "JUNGLE SAFARI",
        description: "An adventurous safari with wild decorations.",
        image: "https://i.pinimg.com/736x/2b/64/2e/2b642e15f6fafd3dc36fc18134c2f14c.jpg",
      },
      {
        name: "CANDY LAND",
        description: "A sweet and colorful candy-inspired theme.",
        image: "https://i.pinimg.com/736x/1d/ea/88/1dea88371cfde5630d176a36bc25bc1d.jpg",
      },
      {
        name: "UNDER THE SEA",
        description: "A magical underwater world with mermaids and sea creatures.",
        image: "https://i.pinimg.com/736x/3c/f0/ea/3cf0ea5fe0b93bb341989760c8fb3842.jpg",
      },
      {
        name: "CARNIVAL CIRCUS",
        description: "A fun-filled party with games, popcorn, and clowns!",
        image: "https://i.pinimg.com/736x/a8/69/fd/a869fd8cacd13d77024b0042783edd3d.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Corporate Event Planning",
    summary: "Hosting a successful corporate event? Here’s everything you need to know...",
    content: `Corporate event planning is a strategic process that requires careful organization and attention to detail to ensure a professional and impactful experience. The first step is to define the event’s objective—whether it is a product launch, a networking conference, a team-building retreat, or a shareholder meeting. Understanding the purpose helps in setting clear goals, such as increasing brand awareness, fostering business relationships, or enhancing employee engagement. Once the objectives are established, determining a suitable budget is essential to allocate resources efficiently and avoid unnecessary expenses.

Selecting the right venue is crucial for the success of a corporate event. The location should be accessible, equipped with necessary amenities, and aligned with the event’s theme and audience. For large conferences or seminars, venues with state-of-the-art audiovisual facilities and comfortable seating arrangements are ideal. Additionally, choosing the right date and time while considering attendees' availability ensures maximum participation. Invitations should be sent well in advance, and RSVPs should be tracked for proper guest management.

Logistics and vendor coordination play a significant role in corporate event execution. Booking reliable vendors for catering, technical support, transportation, and decor must be done early to avoid last-minute complications. A detailed agenda should be prepared, outlining keynote speakers, panel discussions, breakout sessions, or entertainment activities. Having a strong event management team to oversee different aspects ensures smooth operations.

Marketing and branding are essential components of corporate event planning. For public events, promotional strategies such as social media campaigns, press releases, and email invitations help attract the right audience. At the event, using branded materials, banners, and digital presentations reinforces the company’s identity. Post-event engagement, such as sending thank-you emails, gathering feedback, and sharing event highlights, helps measure success and strengthens business relationships. A well-executed corporate event leaves a lasting impression and contributes to the company’s overall growth.`,
    image: "https://i.pinimg.com/736x/89/1c/04/891c045fe7cc053898dd1575331c6e28.jpg",
  },
  {
    id: 5,
    title: "How to Choose the Right Caterer",
    summary: "Food can make or break an event. Here's how to pick the perfect caterer...",
    content: `Choosing the right caterer is a crucial aspect of event planning, as food plays a significant role in guest satisfaction. The first step is to determine your event’s needs, including the type of cuisine, dietary preferences, and the number of guests. A corporate event may require a formal sit-down meal, while a casual gathering might be better suited for buffet-style catering. Understanding these requirements helps in narrowing down caterers who specialize in the type of service and menu you need.

Experience and reputation are key factors in selecting a reliable caterer. Researching online reviews, seeking recommendations, and checking past client testimonials can provide insight into their service quality. It is also beneficial to review their portfolio and menu options to ensure they align with your event’s theme and expectations. Scheduling a tasting session before finalizing a caterer allows you to evaluate the food’s taste, presentation, and portion sizes, ensuring it meets your standards.

Logistics and flexibility are also important considerations when choosing a caterer. The caterer should be able to accommodate dietary restrictions, such as vegetarian, vegan, or gluten-free options, to ensure all guests have a satisfying dining experience. Additionally, confirming their ability to handle on-site cooking, food transportation, and timely setup is essential for a smooth event. Clear communication regarding service staff, table settings, and cleanup responsibilities helps prevent last-minute confusion.

Budget is another crucial factor in selecting a caterer. While quality should not be compromised, it is important to find a caterer who offers good value for money. Requesting a detailed cost breakdown, including food, service fees, rentals, and any additional charges, ensures there are no hidden expenses. By carefully evaluating these aspects, you can choose a caterer that enhances your event with delicious food and excellent service, leaving a lasting impression on your guests.`,
    image: "https://i.pinimg.com/736x/4d/8c/17/4d8c1779582a222e287ed86a01c54f71.jpg",
  },
  {
    id: 6,
    title: "Creative 5 Wedding Stage Decor Ideas",
    summary: "Make your wedding stage stunning with these creative ideas...",
    content: "Wedding stage decor plays a crucial role in setting the mood for the ceremony...",
    image: "https://i.pinimg.com/736x/7b/74/c5/7b74c57c7a5d5f4fc0a84672e2ccde3d.jpg",
    decorList: [
      {
        name: "Floral Backdrops",
        description: "Lush flowers create a dreamy atmosphere.",
        image: "https://i.pinimg.com/736x/d7/8c/fc/d78cfc2b520173e2eafc1711ba301eea.jpg",
      },
      {
        name: "Draped Fabric",
        description: "Soft drapes add elegance to the stage.",
        image: "https://i.pinimg.com/736x/9d/4b/f7/9d4bf7d3765afe99c38c5e77bc106810.jpg",
      },
      {
        name: "Fairy Lights",
        description: "Twinkling lights create a magical feel.",
        image: "https://i.pinimg.com/736x/51/a2/2c/51a22c0edbf19103f016400ae957349f.jpg",
      },
      {
        name: "Themed Props",
        description: "Unique props that reflect your personality.",
        image: "https://i.pinimg.com/736x/41/e8/ce/41e8ce4d153af0efec442dae0a45e633.jpg",
      },
      {
        name: "Candle Arrangements",
        description: "Candles create warmth and intimacy.",
        image: "https://i.pinimg.com/736x/15/83/a5/1583a5f369b48aa922e9132b419d6c8c.jpg",
      },
    ],
  },
  {
    id: 7,
    title: "Best Muhurtham Timings",
    summary: "Find the perfect Muhurtham for your wedding or special event...",
    content: `Muhurtham timings play a vital role in traditional ceremonies, especially in Hindu culture, where auspicious dates and times are selected to ensure prosperity and success. Muhurtham, or the favorable time period, is determined based on astrological calculations, considering planetary positions, star alignments, and the individual’s birth chart (janma kundali). These timings are essential for weddings, housewarming ceremonies (Griha Pravesh), naming ceremonies (Namkaran), and business inaugurations, as they are believed to bring positive energy and divine blessings.

To find the best Muhurtham timing, factors such as Tithi (lunar day), Nakshatra (constellation), Yoga (auspicious combination), and Karana (half of a Tithi) are analyzed by astrologers. Certain days, such as Amavasya (new moon) and Rahu Kaal, are generally avoided for important events, as they are considered inauspicious. Instead, Shubh Muhurthams are chosen on days ruled by favorable planetary influences, ensuring prosperity and harmony. Some of the best months for weddings and other ceremonies include Magha, Phalguna, Vaisakha, and Margashirsha, depending on the year’s astrological calendar.

Different regions and traditions follow specific Muhurtham guidelines. In South India, people often consult Panchangam (the Hindu almanac) to finalize an auspicious date, while in North India, Vedic astrology principles are commonly followed. It is also essential to consider the couple's or individual’s horoscope to align the event with their planetary positions for the best results. In modern times, many people balance astrology with practical considerations, such as venue availability and personal convenience, ensuring a blend of tradition and practicality.

Ultimately, selecting the right Muhurtham timing is a deeply personal and cultural decision that influences the success and happiness of an occasion. Consulting an experienced astrologer and referring to authentic Panchangam sources can help in determining the most suitable time for important life events, ensuring divine blessings and a prosperous future.`,
    image: "https://i.pinimg.com/736x/e6/2c/7b/e62c7b1ee69393c864923a0e17dc67b4.jpg",
  },
  {
    id: 8,
    title: "Top 5 DJs to Rock Your Event",
    summary: "Looking for the best DJs? Check out our top picks...",
    content: "Music is the heart of any event, and choosing the right DJ can make all the difference...",
    image: "https://i.pinimg.com/736x/68/4e/64/684e64769d3a4f502bbb49458be6c137.jpg",
    djList: [
      {
        name: "DJ Nyk",
        description: "DJ NYK's vibrant energy transcends onto some totally foot-tapping numbers which would force anyone to shake a leg.",
        image: "https://cdn.player.fm/images/354301/series/sCihiOOhcvF82DFG/512.jpg"
      },
      {
        name: "DJ Nucleya",
        description: "Czar of Indian EDM Scene and one of the most Talented DJ’s across the land.",
        image: "https://drytickets.com.au/assets/upload/750/450/60/celebrities/304-nucleya.jpg"
      },
      {
        name: "DJ Chetas",
        description: "A music producer who understands his audience and makes music that transcends his fans into a musical high that they are smitten by him!",
        image: "https://i.pinimg.com/736x/fa/07/5c/fa075c4f42f1d2ebcd5bda723a343ab0.jpg"
      },
      {
        name: "DJ Sartek",
        description: "Sarthak Sardana, popularly known by his stage name Sartek, is a DJ from India, and music producer.",
        image: "https://images.ctfassets.net/opz1rk40r4ou/14vzD2wyJNZ344Vt1A4ye5/e26de14be58a5bc2573ee11183598bc9/DJ_Sartek.png"
      },
      {
        name: "DJ Notorious",
        description: "DJ Notorious, with an experience of 15 years in this industry, is widely known for Bollywood remixes, and is considered to be among the top Bollywood DJs in India.",
        image: "https://im.whatshot.in/img/2018/Dec/dj-notorious-1-cropped1-1545222114.jpg"
      }
    ]
  },
];

// Blog List Page
const Blog = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="fw-bold text-primary">Our Blog</h1>
        <p className="text-muted">Get expert tips and ideas for your next event!</p>
      </header>

      <div className="row justify-content-center">
        {blogPosts.map((post) => (
          <div key={post.id} className="col-md-4">
            <div className="blog-card">
              <img src={post.image} alt={post.title} className="blog-card-image" />
              <div className="blog-card-content">
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Blog Detail Page
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) return <h2 className="text-center text-danger">Blog Not Found</h2>;

  return (
    <div className="container py-5">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Blog
      </button>
      <div className="blog-detail">
        <img src={post.image} alt={post.title} className="blog-detail-image" />
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        {/* Render Venue List if Available */}
        {post.venueList && (
          <div className="venue-section">
            <h2>Top Wedding Venues</h2>
            <div className="venue-gallery">
              {post.venueList.map((venue, index) => (
                <div key={index} className="venue-card">
                  <img src={venue.image} alt={venue.name} className="venue-image" />
                  <h3>{venue.name}</h3>
                  <p>{venue.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Image Gallery if Available */}
        {post.imageGallery && (
          <div className="image-gallery-section">
            <h2>Image Gallery</h2>
            <div className="gallery-grid">
              {post.imageGallery.map((img, index) => (
                <div key={index} className="gallery-card">
                  <img src={img.image} alt={img.name} className="gallery-image" />
                  <h3>{img.name}</h3>
                  <p>{img.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render Wedding Stage Decor Ideas if Available */}
        {post.decorList && (
          <div className="wedding-decor-section">
            <h2>5 Creative Wedding Stage Decor Ideas</h2>
            <div className="decor-gallery">
              {post.decorList.map((decor, index) => (
                <div key={index} className="decor-card">
                  <img src={decor.image} alt={decor.name} className="decor-image" />
                  <h3>{decor.name}</h3>
                  <p>{decor.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Render DJ List if Available */}
        {post.djList && (
          <div className="dj-section">
            <h2>Top 5 DJs to Rock Your Event</h2>
            <div className="dj-gallery">
              {post.djList.map((dj, index) => (
                <div key={index} className="dj-card">
                  <img src={dj.image} alt={dj.name} className="dj-image" />
                  <h3>{dj.name}</h3>
                  <p>{dj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporting both components
export default Blog;
export { BlogDetail };  // Named export
