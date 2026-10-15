import {SITE} from '../data/catalog';
import {go} from '../hooks/useRoute';

export function BrandLogo() {
  return (
    <button className="brand" type="button" aria-label={`${SITE.name} home`} onClick={() => go('/')}>
      <span className="brand-mark">{SITE.shortName}</span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-label">Store</span>
    </button>
  );
}
