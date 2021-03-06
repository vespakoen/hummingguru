package com.hummingguru;

import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactNativeHost;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.rnfs.RNFSPackage;
import com.vespakoen.waveform.WaveformPackage;
import com.farmisen.react_native_file_uploader.RCTFileUploaderPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "HummingGuru";
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
  }
}
