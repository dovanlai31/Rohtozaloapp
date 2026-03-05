package com.geso.opvshop;

import com.azendoo.reactnativesnackbar.BuildConfig;
import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import java.util.Arrays;
import java.util.List;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;

import androidx.annotation.Nullable;

import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.microsoft.codepush.react.CodePush;
//import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import java.lang.reflect.InvocationTargetException;



public class MainApplication extends NavigationApplication {

    private final ReactNativeHost host = new NavigationReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }
        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(new MyReactNativePackage());
            return packages;
        }


        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return host;
    }
    @Override
    public Intent registerReceiver(@Nullable BroadcastReceiver receiver, IntentFilter filter) {
        if (Build.VERSION.SDK_INT >= 34 && getApplicationInfo().targetSdkVersion >= 34) {
            return super.registerReceiver(receiver, filter, Context.RECEIVER_EXPORTED);
        } else {
            return super.registerReceiver(receiver, filter);
        }
    }
    @Override
    public void onCreate() { // <-- Check this block exists
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false); // <-- Check this line exists within the block
    }
}




