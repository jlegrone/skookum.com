/** @flow */
require('./styles.css');

import React from 'react';
import Hero from 'Hero';
import Clients from 'Clients';
import CaseStudy from 'CaseStudy';
import Button from 'Button';
import Services from 'Services';
import {nameToHex} from 'nameToColor';
import {Resolver} from 'react-resolver';
import api from 'api';
import lookup from 'lookup';
import Headline from 'Headline';

var cn = s => `Home-${s}`;

class Home extends React.Component {
  render(): ReactElement {
    var heroInfo = this.props.heroInfo[0];
    var textInfo = this.props.textInfo;
    var headlineText = textInfo.find(n => n.id === 'home-headline');
    var homeCapabiltiesText = textInfo.find(n => n.id === 'home-capabilities');
    var capabilitiesButtonText = textInfo.find(n => n.id === 'home-capabilities-button');
    var metaTags = [
      {name: 'title', content: heroInfo.metaTitle},
      {name: 'description', content: heroInfo.metaDescription},
      {name: 'twitter:title', content: heroInfo.metaTitle},
      {name: 'twitter:description', content: heroInfo.metaDescription},
      {property: 'og:title', content: heroInfo.metaTitle},
      {property: 'og:description', content: heroInfo.metaDescription},
      {itemProp: 'name', content: heroInfo.metaTitle},
      {itemProp: 'description', content: heroInfo.metaDescription},
    ];
    return (
      <div className="Home">
        <Hero
          childrenPosition="before"
          color="black"
          image={lookup(heroInfo, 'image.fields.file.url') || '/public/images/hero-default.png'}
          video={lookup(heroInfo, 'vimeo')}
          poster={lookup(heroInfo, 'poster.fields.file.url')}
          title={<img className="Home-wordmark-image" src="/public/images/wordmark.svg" alt="Skookum" />}
          subtitle={<span>We help companies create <span style={{color: nameToHex('orange')}}>digital products</span> people love to use.</span>}
          metaTags={metaTags}/>
        <Headline text={headlineText.title} />
        <Services />
        <CaseStudy />
        <div className="Home-content">
          <div className="Home-content-container">
            <h2 className="Home-content-title">
              {homeCapabiltiesText.title}
            </h2>
            <div className="Home-content-description">
               {homeCapabiltiesText.text}
            </div>
            <Button className="Home-content-button" to="capabilities" type="white" style={{border: 0}}>{capabilitiesButtonText.title}</Button>
          </div>
        </div>
        <Clients />
      </div>
    );
  }
}

Home.propTypes = {};

Home.displayName = 'Home';

export default Resolver.createContainer(Home, {
  resolve: {
    heroInfo() {
      return api(`contentful/hero/home`);
    },
    textInfo() {
      return api(`contentful/text/home`);
    },
  },
});
