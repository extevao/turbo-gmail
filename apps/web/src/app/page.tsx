import { GoogleApisProvider } from '../google-apis/google-apis.context';
import { HomeView } from '../sections/home/view/home.view';

export default function Home() {
  return (
    <GoogleApisProvider>
      <HomeView />
    </GoogleApisProvider>
  );
}
