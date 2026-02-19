export default function Quote() {
  return (
    <section className="py-16 md:py-20 text-center bg-teal text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-medium relative inline-block mb-12">
          Quote of the Day
          <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-12 h-0.5 bg-white" />
        </h2>
        <blockquote className="text-2xl md:text-3xl text-white leading-relaxed italic mb-8">
          &ldquo;The more that you read, the more things you will know. The more that you learn, the more places you&apos;ll go.&rdquo;
        </blockquote>
        <p className="text-xl font-medium text-white/80">Dr. Seuss</p>
      </div>
    </section>
  );
}
