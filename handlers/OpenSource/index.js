require('./styles.css');

import React from 'react';
import Hero from 'Hero';
import {Resolver} from 'react-resolver';
import api from 'api';
import lookup from 'lookup';

import data from './data';

class OpenSource extends React.Component {
  render(): ?ReactElement {
    var heroInfo = this.props.heroInfo[0];

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
      <div className="OpenSource">
        <Hero color="black"
          image={lookup(heroInfo, 'image.fields.file.url') || '/public/images/hero-default.png'}
          videos={lookup(heroInfo, 'videos')}
          poster={lookup(heroInfo, 'poster.fields.file.url')}
          title={heroInfo.title}
          subtitle={lookup(heroInfo, 'subtitle')}
          metaTags={metaTags} />
        {data.map(o => (
          <a href={o.github} target="_blank" className="OpenSource-project">
            <div className="OpenSource-container">
              <h2 className="OpenSource-title">{o.name}</h2>
              <div className="OpenSource-description">{o.description}</div>
            </div>
            <div className="OpenSource-view">View on GitHub</div>
          </a>
        ))}
      </div>
    );
  }
}

OpenSource.propTypes = {};

OpenSource.displayName = 'OpenSource';

export default Resolver.createContainer(OpenSource, {
  resolve: {
    heroInfo() {
      return api(`contentful/hero/open-source`);
    },
  },
});

