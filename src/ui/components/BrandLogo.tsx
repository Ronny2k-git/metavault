export type BrandLogoProps = {
  logoStyle?: string
}

export function BrandLogo({ logoStyle }: BrandLogoProps) {
  return (
    <div className="flex">
      <img src={'/logo.webp'} className={logoStyle} />
    </div>
  )
}
