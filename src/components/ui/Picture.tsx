import { images, type ImageKey } from '../../content/images.generated'
import { cx } from '../../lib/cx'

interface PictureProps {
  image: ImageKey
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

/** Responsive WebP from the generated registry, with intrinsic size to avoid layout shift. */
export function Picture({ image, alt, sizes, className, priority = false }: PictureProps) {
  const asset = images[image]
  const [fallback] = asset.srcset[asset.srcset.length - 1]!
  return (
    <img
      src={fallback}
      srcSet={asset.srcset.map(([src, width]) => `${src} ${width}w`).join(', ')}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={cx('block h-auto w-full', className)}
    />
  )
}
