import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, location, timestamp } = body;

    // Log lead data (in production, save to database)
    console.log('Quiz Lead Tracked:', {
      quizId,
      location,
      timestamp,
      ip: request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent')
    });

    // TODO: Save to database
    // await prisma.quizLead.create({
    //   data: {
    //     quizId,
    //     city: location.city,
    //     state: location.state,
    //     regionName: location.regionName,
    //     timestamp,
    //   }
    // });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Lead tracking error:', error);
    return NextResponse.json({ success: false, error: 'Failed to track lead' }, { status: 500 });
  }
}
