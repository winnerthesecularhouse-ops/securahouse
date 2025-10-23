import React from "react";
import "./PoemHero.css";
import bgImage from "../../assets/poem-bg.jpg"; // replace with your image path

const PoemHero = () => {
  return (
    <section className="poem-hero-section" aria-labelledby="poem-heading">
      <div className="poem-hero-container">
        {/* Left Image */}
        <div className="poem-image">
          <img
            src={bgImage}
            alt="Poem background illustration"
            loading="lazy"
          />
        </div>

        {/* Right Poem */}
        <div className="poem-content">
          <h2 id="poem-heading" className="poem-title">
            Our Title Poem
          </h2>
          <div className="poem-text">
            नई क़लम की खोज
            <br /><br />
            तुम एक कलम हो, कोई अच्छी कविता, किस्सा, कहानी लिखो — कोई याद पुरानी,
            बुढ़ापा, जवानी, क़ुर्बानी लिखो, रेत ज़मी की लो, नूर आसमानी लिखो,
            तुम कोई अच्छी कहानी लिखो।
            <br /><br />
            बच्चे हो, बूढ़े हो, या नवजवान सही, कुछ बातें दिल की जुबानी लिखो,
            तुम कोई अच्छी कहानी लिखो।
            <br /><br />
            यादों की महक, प्यार की निशानी, वफ़ा की जुबानी लिखो।
            <br /><br />
            प्रिय–प्रियतम और मिट्टी से जुड़े कुछ जज़्बात रूहानी लिखो। डायरी के दफ़्न पन्नों
            और खामोश लफ़्ज़ों को आज इस बहाने लिखो।
            <br /><br />
            उठाओ कलम, बातें तुम प्यारी लिखो — प्राइवेट लिखो, सरकारी लिखो,
            भले ही किसी की मक्कारी लिखो। मेरी मानो, अपनी तुम कलाकारी लिखो।
            जो भी लिखो, बात करारी लिखो।
            <br /><br />
            तुम एक कलम हो, कोई अच्छी कहानी लिखो, कोई अच्छी कहानी लिखो।
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoemHero;
