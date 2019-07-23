import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';

import LinkGenerator from './link-generator-component';
import { setTimeout } from 'timers';

const stories = storiesOf('LinkGenerator', module);

const sites = [1,2,3,4,5,].map(item => ({
  name: `Site ${item}`,
  value: item,
}));

stories.addDecorator(withKnobs);

stories.add('Generate', () => (
    <LinkGenerator
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in porta sapien. Maecenas congue quis ipsum vel vestibulum. Vestibulum suscipit, dolor sit amet aliquet dictum, nisi lectus sagittis massa."
      onGenerate={res => console.log(res)}
      sites={sites}
    />
  )
);

stories.add('Finish', () => (
    <LinkGenerator
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in porta sapien. Maecenas congue quis ipsum vel vestibulum. Vestibulum suscipit, dolor sit amet aliquet dictum, nisi lectus sagittis massa."
      stage="finished"
      linkGenerated="https://youtu.be/RySHDUU2juM"
      onGenerate={res => console.log(res)}
      sites={sites}
    />
  )
);

const initialState = {
  stage: 'generate',
  linkGenerated: null,
  loading: false,
};

stories.add('Functional', withState(initialState)(({ store }) => {
  const generateLink = ({ site, link }) => {
    store.set({ loading: true });

    setTimeout(() => {
      store.set({
        stage: 'finished',
        loading: false,
        linkGenerated: `site=${site}&${link}`,
      })
    }, 2500);
  };

  const clean = () => {
    store.set({ stage: 'generate' });
  };

  return (
    <div>
      <LinkGenerator
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in porta sapien. Maecenas congue quis ipsum vel vestibulum. Vestibulum suscipit, dolor sit amet aliquet dictum, nisi lectus sagittis massa."
        stage={store.state.stage}
        loading={store.state.loading}
        linkGenerated={store.state.linkGenerated}
        onGenerate={({ link, site }) => generateLink({ link, site })}
        onClean={clean}
        sites={sites}
      />
    </div>
  );
}));
