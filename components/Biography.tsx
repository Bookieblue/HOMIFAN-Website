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
          src="/Go3.svg"
          alt="Prophet Segun Adewumi"
          width={500} // Set a larger width
          height={500} //
          className="rounded-lg shadow-lg object-cover"
        />
      </div>

      <p className="text-gray-700 leading-relaxed text-center mt-4">
        Prophet Segun Adewumi is a well-known servant of God who has
        distinguished himself with his unwavering desire and deep commitment to
        the will of God. Prophet Segun Adewumi is happily married with children.
        His life is a sweet testament to the ability and the love of God and in
        the life of his servant.
      </p>

      {/* Early Life Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Early Life
        </h2>

        <div className="text-gray-700 mt-3">
          Prophet Adewumi was born into a family of committed servants of God.
          After the untimely demise of his father in 1949, he lived with his
          uncle who was a Prophet of The Aladura Church. Prophet Segun Adewumi
          attended Eyemote Comprehensive High School, Iyin Ekiti after which he
          acquired professional training in Accounting and Administration. His
          last place of work was Wusasse Hospital, Zaria. He left salaried job
          as Accountant Secretary in 1981.{" "}
          {/* {!showEarlyLife ? (
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
          )} */}
        </div>
      </section>

      {/* Divine Mandate Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Divine Mandate
        </h2>
        <div className="text-gray-700 mt-3">
          From an early age, it became evident that Prophet Segun Adewumi’s path
          was divinely orchestrated. Much like the prophets of old, he began to
          exhibit an uncommon ability to comprehend and recite Scripture,
          particularly the Psalms. His spiritual sensitivity was heightened
          beyond the ordinary, and as he grew, it became clear that his journey
          was not to be conventional.{" "}
          <p className="my-5">
            {" "}
            His early attempts to join an existing church were unsuccessful as
            he didn’t fit into any of them. He found that his distinct calling
            could not be contained within the existing traditional structures.
            Each attempt at settling in one of the existing churches ended with
            a divine push, redirecting him towards the unique mission that God
            had assigned to him.{" "}
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
                Then came a pivotal moment—a revelatory dream that cemented his
                divine mandate. In this vision, he found himself presiding over
                a flourishing white- garment, Aladura church. But just as
                quickly, he was outside, clad in ordinary clothing, walking
                alone on a vast six-lane road at the dead of night. In his
                hands, he held a letter. Suddenly, he was pursued by fierce
                dogs, their intention clear—to seize the letter that he carried.
                He ran until exhaustion overcame him, and as he prepared to
                surrender to the inevitable, a great calm settled upon him.
                Before him stood a small yet immaculate bungalow, and as he
                knocked, a middle-aged black man dressed simply in a t-shirt and
                knickers opened the door halfway. Given his notion of a
                spiritual leader as someone always wearing a massive regalia
                complete with a symbolic crown-cap, he was disappointed at the
                man’s casual appearance. He wondered why he should suffer so
                much just to meet this ordinary-looking man.
              </p>

              <p>
                He handed the man the letter and, at that moment, he looked up
                at the doorway and saw the inscription &quot;House of
                Prayer.&quot; This was when he realized the depth of his
                mission.
              </p>

              <p>
                When he sought understanding, the Lord directed me to Isaiah
                49:3—&quot;And said unto me, Thou art my servant, O Isreal, in
                whom I will be glorified.&quot; The vision was clear: he had
                been entrusted with a divine message, a revelation that had to
                be delivered to the right people. The black man in the dream was
                symbolic—a representation of the black race, enslaved
                spiritually, mentally, and physically. The world had fed him
                with distorted doctrines, bound him with traditions foreign to
                the essence of Christianity, and prevented him from experiencing
                the fullness of God’s truth.
              </p>

              <p>
                Ever since, God has illuminated many hidden truths to Prophet
                Segun Adewumi, mysteries that had been veiled for centuries.
                Through divine inspiration, he has been granted insight into the
                true essence of Christianity, insights that challenge
                conventional interpretations yet remain firmly rooted in
                biblical truth.
              </p>

              <p>
                This mandate is a divine call, an assignment entrusted to the
                prophet by the Spirit of the Lord. Like Paul, he is compelled to
                preach this gospel—not as one who seeks approval from men but as
                a servant of God carrying a sacred responsibility.
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
