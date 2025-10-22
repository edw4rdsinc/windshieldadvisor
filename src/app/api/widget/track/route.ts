import { NextResponse } from 'next/server';

/**
 * POST /api/widget/track
 *
 * Tracks widget usage and quiz completions for analytics
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      partnerId,
      quizId,
      quizSlug,
      eventType, // 'started', 'completed', 'answer'
      timestamp,
      metadata,
    } = body;

    // Validate required fields
    if (!partnerId || !quizId || !eventType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Store in database or analytics service
    // For now, just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Widget Tracking]', {
        partnerId,
        quizId,
        quizSlug,
        eventType,
        timestamp: timestamp || new Date().toISOString(),
        metadata,
      });
    }

    // In production, you might send to:
    // - Plausible Analytics
    // - Google Analytics
    // - Custom database
    // - Partner callback webhook

    return NextResponse.json({
      success: true,
      tracked: true,
    });
  } catch (error) {
    console.error('[Widget Tracking Error]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
