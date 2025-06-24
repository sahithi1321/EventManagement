  import React from "react";
  import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
  import "./Gallery.css";

  const GalleryInfo = () => {
    return (
      <Router>
        <div className="gallery-container">
          {/* Navbar */}
          <nav className="gallery-navbar">
            <ul>
              <li>
                <Link to="/" className="gallery-btn">Gallery</Link>
              </li>
            </ul>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<MainGallery />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/category/:categoryName/pictures" element={<PicturesGallery />} />
            <Route path="/category/:categoryName/videos" element={<VideosGallery />} />
          </Routes>
        </div>
      </Router>
    );
  };

  // 🏆 Main Gallery Page (Shows all event categories as cards)
  const MainGallery = () => {
    return (
      <div>
        <h1 className="gallery-title">Our Event Gallery</h1>
        <div className="gallery-grid">
          {galleryCategories.map((category, index) => (
            <Link to={`/category/${category.name}`} key={index} className="gallery-item">
              <div className="gallery-card">
                <img src={category.image} alt={category.name} className="gallery-img" />
                <div className="overlay">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  // 🎉 Category Page (Buttons to view Pictures or Videos)
  const CategoryPage = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();

    return (
      <div>
        <h1 className="gallery-title">{categoryName}</h1>
        <button className="back-btn" onClick={() => navigate("/")}>← Back to Gallery</button>
        <div className="category-buttons">
        <button onClick={() => navigate(`/category/${categoryName}/pictures`)}>📷 Pictures Gallery</button>
        <button onClick={() => navigate(`/category/${categoryName}/videos`)}>🎥 Video Gallery</button>
        </div>
      </div>
    );
  };

  // 🖼 Pictures Gallery Page
  const PicturesGallery = () => {
    const { categoryName } = useParams();
    const category = galleryCategories.find(cat => cat.name === categoryName);
    const navigate = useNavigate();

    return (
      <div>
        <h1 className="gallery-title">{categoryName} - Pictures Gallery</h1>
        <button className="back-btn" onClick={() => navigate(`/category/${categoryName}`)}>← Back</button>
        <div className="gallery-grid">
          {category?.images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`Gallery ${index}`} className="gallery-img" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 🎬 Videos Gallery Page
  const VideosGallery = () => {
    const { categoryName } = useParams();
    const category = galleryCategories.find(cat => cat.name === categoryName);
    const navigate = useNavigate();

    return (
      <div>
        <h1 className="gallery-title">{categoryName} - Video Gallery</h1>
        <button className="back-btn" onClick={() => navigate(`/category/${categoryName}`)}>← Back</button>
        <div className="gallery-grid">
          {category?.videos.map((video, index) => (
            <div key={index} className="gallery-item">
            <iframe width="100%" height="200" src={video} title={`Video ${index}`} className="gallery-video" allowFullScreen />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 🎨 Data for Categories (Replace URLs with actual images & videos)
  const galleryCategories = [
    {
      name: "Wedding Decor",
      description: "Beautifully designed wedding setups",
      image: "https://i.pinimg.com/736x/e2/61/43/e261433526a7de7eac9ddf8caa08c20f.jpg",
      images: ["https://i.pinimg.com/736x/ed/a0/1e/eda01e0438618487619f6c33fcc9ba7d.jpg","https://i.pinimg.com/736x/62/34/79/62347980b3fa01544c7e701761314578.jpg", "https://i.pinimg.com/736x/ad/e4/23/ade423a82176ecc34c727bc8ae75cf84.jpg", "https://i.pinimg.com/736x/54/9d/1a/549d1a6165c8d319406c5c03d26fa9c5.jpg","https://i.pinimg.com/736x/7f/ee/c2/7feec29a12263f795ad266f085e4f101.jpg","https://i.pinimg.com/736x/dd/de/6f/ddde6f285103ff0c2f1027dcaf608f16.jpg","https://i.pinimg.com/736x/0f/13/49/0f13497e3880e70556afacbf1d891e95.jpg","https://i.pinimg.com/736x/b0/65/e4/b065e4c478db09af12202387ed0b98f4.jpg","https://i.pinimg.com/736x/b4/75/16/b475160e01e6a614283b76d46cad444c.jpg","https://i.pinimg.com/736x/74/34/d0/7434d00848046c83ea1874dcaa6e5b6b.jpg","https://i.pinimg.com/736x/2a/6d/fb/2a6dfb00273ba78c2c8577bd26b201b7.jpg","https://i.pinimg.com/736x/c0/4a/72/c04a72169b7d5cce8934f44e3a6f6720.jpg","https://i.pinimg.com/736x/0d/7d/30/0d7d306372a46913ba042d68ce0179d9.jpg","https://i.pinimg.com/736x/cd/51/28/cd5128e9cbad76013132cc91c898bb6b.jpg","https://i.pinimg.com/736x/2d/17/eb/2d17eb4429f64e9f0911c9b8f4eb0618.jpg","https://i.pinimg.com/736x/a2/6f/70/a26f703a349e7e62e6e614a9e74765e4.jpg"],
      videos: ["YOUR_VIDEO_URL_1"]
    },
    {
      name: "Traditional Ceremony",
      description: "Cultural and traditional celebrations",
      image: "https://i.pinimg.com/736x/9b/82/f1/9b82f115e8db873f032eb231c634d14a.jpg",
      images: ["https://i.pinimg.com/736x/c4/97/f3/c497f38285586733a1ba9bc5a5a59390.jpg","https://i.pinimg.com/736x/4c/f5/b5/4cf5b517fed4423083fa4bc7fceeecc2.jpg","https://i.pinimg.com/736x/47/aa/dc/47aadce29bcb3d979e51d253ea5e7f2d.jpg","https://i.pinimg.com/736x/c9/62/af/c962af1118ca04572f1ceb86e6265492.jpg", "https://i.pinimg.com/736x/35/d0/d7/35d0d7ebf223d83f028d9cfd2c67e80c.jpg", "https://i.pinimg.com/736x/4e/cb/9f/4ecb9f9e146b1c26e4ad0855b811f26a.jpg","https://i.pinimg.com/736x/25/2b/be/252bbedf2fe06170cee20e4a5877fc1e.jpg", "https://i.pinimg.com/736x/a8/b1/4a/a8b14a8e892dea24fd87522811aa90b1.jpg","https://i.pinimg.com/736x/87/d2/f1/87d2f12746254ca779799ad1edac8d07.jpg","https://i.pinimg.com/736x/83/8a/f9/838af978da956c5dffa5ddae79a5d594.jpg","https://i.pinimg.com/736x/24/84/ca/2484cad8b71b45fa3296c2dd5672a029.jpg","https://i.pinimg.com/736x/83/75/f7/8375f7fddde4b98cf73f19671751fbbb.jpg","https://i.pinimg.com/736x/4d/03/e2/4d03e2690764e5eb21aca31ee976025d.jpg","https://i.pinimg.com/736x/3e/d5/d5/3ed5d5bb3b4b3ba824d737430ecbaa88.jpg","https://i.pinimg.com/736x/d4/e6/f4/d4e6f4dceadecf00a79d347749b08e3e.jpg","https://i.pinimg.com/736x/2c/cd/dd/2ccddd8c90b256379f08794d3d56caca.jpg"],
      videos: ["YOUR_VIDEO_URL_2"]
    },
    {
      name: "Reception Hall",
      description: "Elegant reception arrangements",
      image: "https://i.pinimg.com/736x/87/f2/f4/87f2f49d2d2498eaeea6b90ac0e6c24c.jpg",
      images: ["https://i.pinimg.com/736x/a5/62/d1/a562d15a786e9f80dcdbcd3277f8cd0b.jpg", "https://i.pinimg.com/736x/41/b7/60/41b76069d4f674e3ce83d577f8359606.jpg", "https://i.pinimg.com/736x/36/bd/36/36bd36c8827d3b643e77ca6286c2adee.jpg", "https://i.pinimg.com/736x/6b/51/9f/6b519f5d9c975208dc41b250d1fd3b67.jpg","https://i.pinimg.com/736x/6a/67/38/6a6738943fdb01b26b4e9d202b516bff.jpg","https://i.pinimg.com/736x/2d/03/ff/2d03ff880829fc2b72ab7bbc45742df0.jpg","https://i.pinimg.com/736x/9e/8a/89/9e8a89c8c68de0c13ab5c68712a0e451.jpg","https://i.pinimg.com/736x/06/08/bc/0608bcbce46c8423ccafb1225ac1f839.jpg","https://i.pinimg.com/736x/00/2b/40/002b40ca0aceb1eeb0654f0883128b7e.jpg","https://i.pinimg.com/736x/c0/46/85/c04685bdf7c4fc6f206167d0188059c2.jpg","https://i.pinimg.com/736x/c3/0a/20/c30a204bd068b26e71de2a00b87dfe91.jpg","https://i.pinimg.com/736x/da/0c/82/da0c8243dc81f53531210982a44be7bd.jpg","https://i.pinimg.com/736x/cf/7e/39/cf7e398041dda5af93cef3497a6cb278.jpg","https://i.pinimg.com/736x/37/a0/04/37a004a53ceca090d517158c75dd5a67.jpg","https://i.pinimg.com/736x/b2/40/2a/b2402aff57706a8ddd1e103b2709f9ce.jpg","https://i.pinimg.com/736x/5e/45/f0/5e45f0daf4e4d3dc51459b0f52c3b27c.jpg"],
      videos: ["YOUR_VIDEO_URL_3"]
    },
    {
      name: "Outdoor Wedding",
      description: "Scenic outdoor wedding venues",
      image: "https://i.pinimg.com/736x/89/63/25/896325d7deabae754adf820c0ca8303b.jpg",
      images: ["https://i.pinimg.com/736x/0f/05/58/0f0558794df1081cd310f21f574f5740.jpg","https://i.pinimg.com/736x/d0/fe/64/d0fe64ed1a3d924f93acec6f52955edc.jpg", "https://i.pinimg.com/736x/b9/71/d2/b971d2299482b18b9f4d9c420ac2a0c8.jpg","https://i.pinimg.com/736x/07/f8/15/07f815cb74f2a4dd7dabf878e1e99f49.jpg", "https://i.pinimg.com/736x/bf/aa/94/bfaa94eb538c93c3d7ac715f499ea54a.jpg","https://i.pinimg.com/736x/00/5f/3c/005f3c902c4086cca7500508fca7392f.jpg", "https://i.pinimg.com/736x/ca/01/65/ca01659f6a6aea193761ba19c60e43d0.jpg","https://i.pinimg.com/736x/16/19/58/161958c7e1246bb4afd5980141d28f96.jpg","https://i.pinimg.com/736x/ef/4e/c8/ef4ec8953622c4ad7f3fb4edfc0683be.jpg","https://i.pinimg.com/736x/97/da/78/97da78cb953ffa8d7a1bb204afe4fb64.jpg","https://i.pinimg.com/736x/0e/eb/9c/0eeb9cfbf6f30aa85be654a634de7f48.jpg","https://i.pinimg.com/736x/a6/3a/52/a63a5216f138f23a07482ae71c2d050f.jpg","https://i.pinimg.com/736x/c2/b5/a5/c2b5a5e840c437b78f292e2e9af874d1.jpg","https://i.pinimg.com/736x/eb/68/24/eb68246ab98537dec132e6a705d44720.jpg","https://i.pinimg.com/736x/0d/5d/20/0d5d20ff9894fba3be7aff8d52f1e69e.jpg","https://i.pinimg.com/736x/26/78/8b/26788b9dc2c7fb082feb69ff094d0126.jpg"],
      videos: ["YOUR_VIDEO_URL_4"]
    },
    {
      name: "Birthday Party",
      description: "Fun-filled birthday celebrations",
      image: "https://i.pinimg.com/736x/e3/1a/fb/e31afb2c588be20e2ef0cc1584879203.jpg",
      images: ["https://i.pinimg.com/736x/95/b0/ce/95b0ceb629f86f64e2dd1c856d4a921e.jpg", "https://i.pinimg.com/736x/7d/20/ca/7d20ca8b83572e5840c9b615d7fb8d7d.jpg", "https://i.pinimg.com/736x/85/a8/14/85a81482915810624f66b2c416409aac.jpg","https://i.pinimg.com/736x/50/00/6c/50006c02b1ed35c9cb7c16250ff918eb.jpg" ,"https://i.pinimg.com/736x/8a/44/36/8a4436c26cd3bff68c8c1b3628536bef.jpg","https://i.pinimg.com/736x/ce/22/a5/ce22a50a29903fbe7eb7a14e7f09c716.jpg","https://i.pinimg.com/736x/c7/ac/bc/c7acbc3a1225ee675735487de775cc7b.jpg","https://i.pinimg.com/736x/19/97/21/199721eff0228eca5efe3e559be6d0f9.jpg"],
      videos: ["YOUR_VIDEO_URL_5"]
    },
    {
      name: "Corporate Event",
      description: "Professional corporate gatherings",
      image: "https://i.pinimg.com/736x/41/2e/c8/412ec8dc1229f0b7cb3c1a94a82f3721.jpg",
      images: ["https://i.pinimg.com/736x/03/ab/03/03ab03d3d4ddc645134259c0e31dbe11.jpg", "https://i.pinimg.com/736x/e0/3e/97/e03e97e7bcc47bb6d2affff39cd57f46.jpg", "https://i.pinimg.com/736x/91/67/68/916768d7ef1a26f4666e3ec81e28d807.jpg", "https://i.pinimg.com/736x/51/11/52/511152c373f740b2e4b6a06aef4e2cf1.jpg","https://i.pinimg.com/736x/2b/13/01/2b13016b8401e73fa7387a7151358ad8.jpg","https://i.pinimg.com/736x/b0/f2/c7/b0f2c7a61cf79e62e5bb157bbe205324.jpg","https://i.pinimg.com/736x/1f/a8/72/1fa872352d50c182e2f9cf0645bfae47.jpg","https://i.pinimg.com/736x/75/a0/7b/75a07bd871ffc76a5353c4d0fb48ec28.jpg"],
      videos: ["YOUR_VIDEO_URL_6"]
    },
    {
      name: "Engagement Party",
      description: "Memorable engagement celebrations",
      image: "https://i.pinimg.com/736x/1c/fe/c1/1cfec11311b0ae3e4624992cda342e9f.jpg",
      images: ["https://i.pinimg.com/736x/71/0e/2b/710e2ba62e79e263702fb11c3cc212c9.jpg", "https://i.pinimg.com/736x/39/c5/ae/39c5aec47eca58419cc016e4b5914125.jpg","https://i.pinimg.com/736x/36/d9/03/36d903bef5303e7ae6539d9e4f5722a7.jpg" ,"https://i.pinimg.com/736x/bd/7e/d4/bd7ed43c4ae3dc6d745a0b87186926e7.jpg", "https://i.pinimg.com/736x/ae/66/b0/ae66b0ddcac346f86445e285e7094a05.jpg","https://i.pinimg.com/736x/af/fb/de/affbde5eae188861f6a0d89cedeb36c5.jpg","https://i.pinimg.com/736x/16/b4/ee/16b4ee948d0064425c44263134256443.jpg","https://i.pinimg.com/736x/7f/70/4b/7f704b8c4033b1437b8cfae51438c96c.jpg","https://i.pinimg.com/736x/c0/0a/82/c00a82a4b6d3417476963ad891fa32d9.jpg","https://i.pinimg.com/736x/c7/f1/e1/c7f1e118ee20e1609ba6145dbd525dd2.jpg"],
      videos: ["YOUR_VIDEO_URL_7"]
    },
    {
      name: "Concerts & Live Shows",
      description: "Thrilling live performances",
      image: "https://i.pinimg.com/736x/0f/e1/a6/0fe1a63fa7d2e60cf63d75479f207221.jpg",
      images: ["https://i.pinimg.com/736x/68/4e/64/684e64769d3a4f502bbb49458be6c137.jpg","https://i.pinimg.com/736x/7d/e8/cd/7de8cd83bdc12aa4b3107a1b285ddaed.jpg","https://i.pinimg.com/736x/4f/41/a1/4f41a1a2f628b9e713be8f17d2e4efe4.jpg", "https://i.pinimg.com/736x/38/52/07/385207ec763024ea0c8591a8f66a11e6.jpg", "https://i.pinimg.com/736x/7a/ab/f3/7aabf3dba18116dc7434de9484e7cc64.jpg", "https://i.pinimg.com/736x/40/f3/22/40f3228c12333d610f7b384b316d2fd5.jpg"],
      videos: ["YOUR_VIDEO_URL_8"]
    },
    {
      name: "Telugu Wedding",
      description: "Traditional Telugu wedding rituals",
      image: "https://i.pinimg.com/736x/ab/88/53/ab8853ce3924391283d9054fd99655cf.jpg",
      images: ["https://i.pinimg.com/736x/0a/88/40/0a8840dd055cc1778d16c1af6e904a09.jpg", "https://i.pinimg.com/736x/ee/40/81/ee408124e6763462a8457f2c2bba8b1d.jpg", "https://i.pinimg.com/736x/b9/f4/29/b9f4295d96c7626357fec0befbf2a57f.jpg","https://i.pinimg.com/736x/e2/22/ae/e222aed86be1197a851726feaf965173.jpg","https://i.pinimg.com/736x/50/ae/c7/50aec7e92fa729c26af11cabd3f2f908.jpg","https://i.pinimg.com/736x/81/e0/cc/81e0cc44f11862b5d2a62362565ebdfe.jpg","https://i.pinimg.com/736x/0f/2c/b2/0f2cb26e3d4e194306f321b4eed6f576.jpg","https://i.pinimg.com/736x/93/a3/dc/93a3dc91316dcc6f9e15891237f48332.jpg" ,"https://i.pinimg.com/736x/f7/fe/02/f7fe02d353b2d6bce87e4c8275330f38.jpg","https://i.pinimg.com/736x/84/c1/b3/84c1b3ee048d682cc9afa96746f1d230.jpg","https://i.pinimg.com/736x/69/1b/35/691b35ade6bbceff25dbd8820085049c.jpg","https://i.pinimg.com/736x/9e/be/f3/9ebef33b361cacf00ae2ad84935ed3b0.jpg","https://i.pinimg.com/736x/67/bb/0c/67bb0c6a81f58446558924d1d1f1f791.jpg","https://i.pinimg.com/736x/8f/49/0d/8f490d8f6f05b7402954835111cfe598.jpg","https://i.pinimg.com/736x/7f/1f/a5/7f1fa56236fb8f50ccb660394490126f.jpg","https://i.pinimg.com/736x/db/38/f3/db38f350838a13d7f757e98e859e8e8e.jpg","https://i.pinimg.com/736x/74/e0/77/74e07772aabfb14a946654c8debc0669.jpg","https://i.pinimg.com/736x/3f/5d/30/3f5d30412d8edebc24fe0a11ce4e5b5d.jpg","https://i.pinimg.com/736x/f4/4c/9e/f44c9e1e9952dad9d2785c673a7421bf.jpg","https://i.pinimg.com/736x/db/93/aa/db93aa41535056ff43ebb8bf436cdfdb.jpg","https://i.pinimg.com/736x/7e/3c/88/7e3c88e4d18ba3a5b00e917e89cff7a0.jpg","https://i.pinimg.com/736x/24/1f/33/241f33ece0c38f3cea5baf16dded9b60.jpg","https://i.pinimg.com/736x/ce/1e/82/ce1e82a0c0f3c69a1fbcb0a11dfc362c.jpg","https://i.pinimg.com/736x/b6/3a/56/b63a5616991035b9ca8b419e1d1357fe.jpg","https://i.pinimg.com/736x/c4/4f/55/c44f55a4917e1cc14e2ca55081e0b2d4.jpg","https://i.pinimg.com/736x/65/98/df/6598dfa6b03a984bc44b21a7f478ff88.jpg","https://i.pinimg.com/736x/ce/78/76/ce7876b471c0fed1949d4354d08a658a.jpg","https://cdn.gulte.com/wp-content/uploads/2024/12/sobhitad_1733663529_3518547163908561139_408201886-819x1024.jpg","https://i.pinimg.com/736x/bc/35/77/bc3577b147284651a489c806fe7ce825.jpg","https://i.pinimg.com/736x/27/8c/28/278c2850f3f341d1d81d817ed518500e.jpg","https://i.pinimg.com/736x/72/28/8f/72288f528d340f839ac927baea594161.jpg","https://i.pinimg.com/736x/4e/7b/4c/4e7b4c14a1fd6e54f276844045c97f59.jpg","https://i.pinimg.com/736x/f7/42/5a/f7425a67730b3903df2a53884837f69c.jpg","https://i.pinimg.com/736x/4e/2d/90/4e2d90618cf5f1b87406e33cd7efd63d.jpg","https://i.pinimg.com/736x/cf/75/ff/cf75ffde06aa11d2baa22d0313b4cc46.jpg","https://i.pinimg.com/736x/c8/ad/35/c8ad357c73a289b39faa53fcb28c66d5.jpg"],
      videos: ["YOUR_VIDEO_URL_9"]
    },
    {
      name: "Bride & Groom Portraits",
      description: "Elegant and timeless couple portraits",
      image: "https://i.pinimg.com/736x/7f/e8/7a/7fe87ad0fb401caaaa2705e789cc303f.jpg",
      images: ["https://i.pinimg.com/736x/89/7c/da/897cdadd6cc9ddd34ac0aa1bb6e02569.jpg","https://i.pinimg.com/736x/06/fe/60/06fe60c6fd4ae401e472cfe560eebdca.jpg", "https://i.pinimg.com/736x/4d/3a/68/4d3a6864c2841fe6995fdd869b0545da.jpg", "https://i.pinimg.com/736x/a9/07/3c/a9073cc81cc56919e7f4ed7ef1f4fc49.jpg", "https://i.pinimg.com/736x/de/11/78/de117858ab98985cc7e4913fdb7b2306.jpg","https://i.pinimg.com/736x/b5/99/b2/b599b2bc7d4e5a8b0b2e864d94f89735.jpg","https://i.pinimg.com/736x/e5/96/13/e596139e9367bc32bf27354ebb212c31.jpg","https://i.pinimg.com/736x/7e/13/9b/7e139bdf8fd4dabc3baac541724fb40b.jpg","https://i.pinimg.com/736x/b8/44/55/b84455c6981a1af6f69030e7070123cd.jpg"],
      videos: ["YOUR_VIDEO_URL_10"]
    }
  ];

export default GalleryInfo;