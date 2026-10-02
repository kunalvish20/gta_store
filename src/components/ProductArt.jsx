export function ProductArt({item, large = false, priority = false, className = ''}) {
  return (
    <div className={`product-art ${large ? 'large' : ''} ${className}`}>
      <img
        src={item.src}
        alt={item.name}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={item.contain ? 'contain' : ''}
      />
    </div>
  );
}
