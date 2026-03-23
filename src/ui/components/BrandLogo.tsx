export type BrandLogoProps = {
  logoStyle?: string
}

export function BrandLogo({ logoStyle }: BrandLogoProps) {
  return (
    <div className="flex">
      <img alt="brand-logo" accessKey="brand-logo" src={'/logo.webp'} className={logoStyle} />
    </div>
  )
}
