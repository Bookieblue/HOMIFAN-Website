"use client";
import Image from "next/image";
import React, { useState } from "react";

const Biography: React.FC = () => {
  const [showEarlyLife, setShowEarlyLife] = useState(false);
  const [showMandate, setShowMandate] = useState(false);

  return (
    <div className="max-w-4xl  mx-auto p-6 my-20 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
        Prophet Segun Adewumi
      </h1>

      {/* Prophet's Image */}
      <div className="flex justify-center lg:w-[40%] mx-auto">
        <Image
          src="/Go3.jpg"
          alt="Prophet Segun Adewumi"
          width={500} // Set a larger width
          height={500} //
          className="rounded-lg shadow-lg object-cover"
        />
      </div>

      <p className="text-gray-700 leading-relaxed text-center mt-4">
        Prophet Segun Adewumi is a well known servant of God who has
        distinguished himself with his unwavering desire and deep commitment to
        the will of God. Prophet Segun Adewumi is happily married with children.
        His life is a sweet testament to the ability and the love of God and in
        the life of his servant
      </p>

      {/* Early Life Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Early Life
        </h2>

        <div className="text-gray-700 mt-3">
          Prophet Segun Adewumi attended Eyemote Comprehensive High School, Iyin
          Ekiti after which he acquired professional training in Accounting and
          Administration. His last place of work was Wusasse Hospital, Zaria
          where he left salaried job as Accountant Secretary in 1981. Prophet
          Adewumi was born into the family of committed servants of God. After
          the untimely demise of his father in 1949, he lived with his uncle who
          was a Prophet of The Aladura Church. As early as he was ten years old,
          he began to exhibit the ability to recite important Bible lines
          especially the Psalms. He could close his eyes and read out almost
          half of the Psalms and the hymns of the church very accurately.{" "}
          {!showEarlyLife ? (
            <>
              ...{" "}
              <button
                onClick={() => setShowEarlyLife(true)}
                className="text-blue-600 font-medium"
              >
                Read more
              </button>
            </>
          ) : (
            <>
              <p className="my-5">
                He was called to start a church in his early days but he tried
                to join some existing churches, but somehow, he did not fit in
                into any of them. Below is his testimony: After I had left the
                last church that I joined, I had a dream in which I presided
                over a big and flourishing white garment church, but suddenly I
                found myself in mufti and outside the church. I was on a well
                laid six lanes road but the time was one o’clock after midnight.
                I had a letter in my hand and I was alone. Suddenly some hefty
                dogs appeared behind to pursue me.
              </p>

              <p className="mb-5">
                I ran until I was tired and began to contemplate releasing
                myself to the dogs. Just in the manner of Psalm 107 verse 9,
                suddenly there was a calm. I was standing in front of a neat
                bungalow. I knocked at the door and an average aged black
                gentleman opened the door halfway. I delivered my letter to him
                and I began to think why should I suffer so much to meet this
                gentleman. Even though he was dressed in a neat T shirt and
                knickers with expensive wrist watch and ring, I knew the episode
                was a spiritual affair, and judging from my experience in the
                spiritual church, I had expected a spiritual giant wearing long
                and massive regalia with a big crown on his head. I looked up at
                the lintel of the house and I saw the inscription “House of
                Prayer”.
              </p>

              <p>
                I was disturbed and needed to know the meaning and indeed the
                implication of the dream. I prayed to God to answer my prayer.
                From the Bible, I was immediately directed to Isaiah 49 verse 3.
                The dream and the Bible reference convinced me of my mission for
                the church. That was how I knew that I had to start a church.{" "}
              </p>

              <button
                onClick={() => setShowEarlyLife(false)}
                className="text-blue-600 font-medium"
              >
                Read less
              </button>
            </>
          )}
        </div>
      </section>

      {/* Divine Mandate Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Divine Mandate
        </h2>
        <div className="text-gray-700 mt-3">
          The mandate of the ministry is demonstrated and outlined in the dream
          that I explained earlier. The dream became actualized when I started
          the white garment church in 1989. Some years later, the church
          translated fully into a Pentecostal Assembly. For well over thirty
          years I was hotly chased by the dogs. The plot was to seize the letter
          that I held in the dream. Just as it happened in the dream, I have
          finally submitted the letter to the appropriate person. Please
          remember, that man was a simply dressed, average aged, black man. The
          house was small and neat. The environment was peaceful. After the
          dream, I consulted my Bible and was directed to Isaiah 49 verse 3.{" "}
          <p className="my-5">
            {" "}
            Ever since, God has revealed and demystified many contentious
            biblical issues to me to the extent that I can boldly, but with
            humility, quote Psalm 119 verse 99. To us, the mystery of the Garden
            of Eden has been resolved, ditto for the mystery of the Holy
            Trinity. The early journey of the believer is likened to an egg race
            with only very few being able to safely reach the end of the race
            with their egg. That the letter was addressed to the simply dressed
            black man is also symbolic. The black man has been a slave to two
            major world religions: Christian and Islam.{" "}
          </p>
          {!showMandate ? (
            <>
              ...{" "}
              <button
                onClick={() => setShowMandate(true)}
                className="text-blue-600 font-medium"
              >
                Read more
              </button>
            </>
          ) : (
            <>
              <p>
                For the fact that Christianity got to the black man through the
                people from the West, it did become a weapon of physical, mental
                and spiritual colonization. The culture of the West became the
                ideal way of life for a typical Christian. His prayer also has
                to pass through the spiritual space of the West. His inability
                or refusal to pray directly to God denies him of the real goal
                of Holy Spirit as the life of God in man. The Holy Spirit
                liberates man by fully harnessing his physical, mental and
                spiritual potentials. He has come to set the captives free but
                the black man would always deny himself the freedom but he had
                to imitate the Pastors from the west. My letter was a call to
                the black race to listen to Jesus in Isaiah 61 verse 1.
              </p>

              <button
                onClick={() => setShowMandate(false)}
                className="text-blue-600 font-medium"
              >
                Read less
              </button>
            </>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          A Visionary Leader
        </h2>
        <p className="text-gray-700 mt-3">
          Prophet Segun Adewumi, a man of unwavering faith and unrelenting
          passion, was chosen by God to spearhead this divine endeavor. With a
          heart beating for the salvation and transformation of humanity,
          Prophet Adewumi has dedicated his life to the advancement of God’s
          kingdom, laboring tirelessly to spread the gospel and bring hope to
          the hopeless.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          A Ministry of Help and Guidance
        </h2>
        <p className="text-gray-700 mt-3">
          For over three decades, House of Prayer Ministries for all Nations has
          served as a reliable source of motivation, help, and advice to
          countless individuals and families. Through its various Ministries and
          outreaches, the church has provided a safe haven for people from all
          walks of life to find comfort, guidance, and spiritual nourishment.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          A Commitment to Spiritual Growth
        </h2>
        <p className="text-gray-700 mt-3">
          At House of Prayer Ministries, we are committed to fostering an
          environment conducive to spiritual growth and development. Our
          teachings are firmly rooted in the Word of God, and our programs are
          designed to equip believers with the knowledge, skills and character
          necessary to live victorious Christian life.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          A Global Outreach
        </h2>
        <p className="text-gray-700 mt-3">
          House of Prayer Ministries for all Nations is more than just a local
          church: Through our various missions and outreach programs, we are
          reaching out to communities around the world, sharing the love of
          Christ, and empowering people to live purposeful and fulfilling lives.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Join Us
        </h2>
        <p className="text-gray-700 mt-3">
          If you are searching for a church that is passionate about spreading
          the gospel, fostering spiritual growth, and providing a supportive
          community, then House of Prayer Ministries for all Nations is the
          place for you. We invite you to join us on this journey of faith,
          discovery, and transformation.
        </p>
      </section>
    </div>
  );
};

export default Biography;
